'use client';

import { useMemo, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import RouteMap from '@/components/RouteMap';
import { formatDate } from '@/lib/format';
import { metaLabel } from '@/lib/styles';
import {
  feet,
  formatDuration,
  formatLabel,
  formatPace,
  formatPaceSeconds,
  miles,
  paceSeconds,
} from '@/lib/runs';
import type { Run, RunDetails } from '@/lib/runs';

const tinyLabel =
  'text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500';

// --- Stats --------------------------------------------------------------------

function statList(run: Run, details?: RunDetails | null) {
  const d = details ?? undefined;
  const stats: { label: string; value: string | null }[] = [
    { label: 'Distance', value: `${miles(run.distance_m).toFixed(2)} mi` },
    { label: 'Time', value: formatDuration(run.moving_time_s) },
    { label: 'Avg pace', value: formatPace(run.distance_m, run.moving_time_s) },
    { label: 'Elevation', value: `${feet(run.elevation_gain_m)} ft` },
    { label: 'Avg HR', value: d?.avg_hr ? `${d.avg_hr} bpm` : null },
    { label: 'Max HR', value: d?.max_hr ? `${d.max_hr} bpm` : null },
    {
      label: 'Cadence',
      value: d?.avg_cadence_spm ? `${d.avg_cadence_spm} spm` : null,
    },
    {
      label: 'Fastest mile',
      value: d?.fastest_mile_s ? formatPaceSeconds(d.fastest_mile_s) : null,
    },
    {
      label: 'Training effect',
      value: d?.aerobic_training_effect
        ? `${d.aerobic_training_effect.toFixed(1)}${
            d.training_effect_label
              ? ` · ${formatLabel(d.training_effect_label)}`
              : ''
          }`
        : null,
    },
    { label: 'VO2 max', value: d?.vo2max ? String(d.vo2max) : null },
    {
      label: 'Calories',
      value: d?.calories ? `${Math.round(d.calories)} kcal` : null,
    },
    {
      label: 'Stride',
      value: d?.avg_stride_cm
        ? `${(d.avg_stride_cm / 100).toFixed(2)} m`
        : null,
    },
  ];
  return stats.filter((stat) => stat.value);
}

// --- Charts -------------------------------------------------------------------
// Three single-series charts on a shared distance axis with one crosshair:
// hovering any of them reads out the same point on all three.

const CHART_W = 600;
const CHART_H = 96;
const PAD_Y = 8;

type Point = { x: number; y: number };
// Base no-unused-vars flags parameter names inside function *types*.
// eslint-disable-next-line no-unused-vars
type Format = (value: number) => string;
// eslint-disable-next-line no-unused-vars
type HoverHandler = (index: number | null) => void;

function linePath(points: (Point | null)[]) {
  let d = '';
  let pen = false;
  for (const p of points) {
    if (!p) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    pen = true;
  }
  return d;
}

function SeriesChart({
  title,
  values,
  xMiles,
  totalMiles,
  format,
  invert = false,
  area = false,
  hover,
  onHover,
}: {
  title: string;
  values: (number | null)[];
  xMiles: number[];
  totalMiles: number;
  format: Format;
  /** Lower is better (pace): draw it upside down so "up" means faster. */
  invert?: boolean;
  area?: boolean;
  hover: number | null;
  onHover: HoverHandler;
}) {
  const { points, min, max } = useMemo(() => {
    const present = values.filter((v): v is number => v !== null);
    const lo = Math.min(...present);
    const hi = Math.max(...present);
    const span = hi - lo || 1;
    const scaleY = (v: number) => {
      const t = (v - lo) / span;
      return PAD_Y + (invert ? t : 1 - t) * (CHART_H - PAD_Y * 2);
    };
    return {
      min: lo,
      max: hi,
      points: values.map((v, i) =>
        v === null || xMiles[i] === undefined
          ? null
          : { x: (xMiles[i] / totalMiles) * CHART_W, y: scaleY(v) }
      ),
    };
  }, [values, xMiles, totalMiles, invert]);

  if (!points.some(Boolean)) return null;

  const line = linePath(points);
  const first = points.find(Boolean)!;
  const last = [...points].reverse().find(Boolean)!;
  const fill = area
    ? `${line}L${last.x.toFixed(1)} ${CHART_H}L${first.x.toFixed(1)} ${CHART_H}Z`
    : null;

  const hovered = hover !== null ? points[hover] : null;
  const hoveredValue = hover !== null ? values[hover] : null;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const mile = ((event.clientX - box.left) / box.width) * totalMiles;
    let best = 0;
    for (let i = 1; i < xMiles.length; i++) {
      if (Math.abs(xMiles[i] - mile) < Math.abs(xMiles[best] - mile)) best = i;
    }
    onHover(best);
  }

  const ticks = Array.from({ length: Math.floor(totalMiles) }, (_, i) => i + 1);
  // The plot stretches to any width at a fixed height; strokes stay 1-2px and
  // the marker/labels are HTML so nothing distorts or shrinks on phones.
  const stroke = { vectorEffect: 'non-scaling-stroke' as const };

  return (
    <figure>
      <figcaption className='flex items-baseline justify-between gap-2'>
        <span className={tinyLabel}>{title}</span>
        <span className='text-xs tabular-nums text-gray-500 dark:text-gray-400'>
          {hoveredValue !== null && hover !== null
            ? `${format(hoveredValue)} · ${xMiles[hover].toFixed(2)} mi`
            : `${format(invert ? max : min)} – ${format(invert ? min : max)}`}
        </span>
      </figcaption>
      <div
        className='relative mt-1 h-24 cursor-crosshair touch-none'
        role='img'
        aria-label={`${title} over distance, ${format(invert ? max : min)} to ${format(invert ? min : max)}`}
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => onHover(null)}
      >
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          preserveAspectRatio='none'
          className='absolute inset-0 h-full w-full overflow-visible'
          aria-hidden
        >
          <line
            x1={0}
            x2={CHART_W}
            y1={CHART_H}
            y2={CHART_H}
            className='stroke-gray-200 dark:stroke-gray-700'
            strokeWidth={1}
            style={stroke}
          />
          {ticks.map((tick) => {
            const x = (tick / totalMiles) * CHART_W;
            return (
              <line
                key={tick}
                x1={x}
                x2={x}
                y1={0}
                y2={CHART_H}
                className='stroke-gray-200 dark:stroke-gray-700'
                strokeWidth={1}
                strokeDasharray='2 4'
                style={stroke}
              />
            );
          })}
          {fill && <path d={fill} fill='var(--main)' fillOpacity={0.14} />}
          <path
            d={line}
            fill='none'
            stroke='var(--main)'
            strokeWidth={2}
            strokeLinejoin='round'
            strokeLinecap='round'
            style={stroke}
          />
          {hovered && (
            <line
              x1={hovered.x}
              x2={hovered.x}
              y1={0}
              y2={CHART_H}
              className='stroke-gray-400 dark:stroke-gray-500'
              strokeWidth={1}
              style={stroke}
            />
          )}
        </svg>
        {hovered && (
          <span
            className='pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--main)] ring-2 ring-white dark:ring-[#1c1c1c]'
            style={{
              left: `${(hovered.x / CHART_W) * 100}%`,
              top: `${(hovered.y / CHART_H) * 100}%`,
            }}
            aria-hidden
          />
        )}
      </div>
      <div className='relative mt-1 h-4' aria-hidden>
        {ticks.map((tick) => (
          <span
            key={tick}
            className='absolute -translate-x-1/2 whitespace-nowrap text-[10px] tabular-nums text-gray-400 dark:text-gray-500'
            style={{ left: `${(tick / totalMiles) * 100}%` }}
          >
            {tick} mi
          </span>
        ))}
      </div>
    </figure>
  );
}

function Charts({ run, details }: { run: Run; details: RunDetails }) {
  const [hover, setHover] = useState<number | null>(null);
  const { series } = details;

  const xMiles = useMemo(
    () => series.distance_m.map((d) => miles(d ?? 0)),
    [series.distance_m]
  );
  const pace = useMemo(
    () =>
      // Ignore near-stops so a pause doesn't flatten the whole chart.
      series.speed_mps.map((s) => (s && s > 0.8 ? 1609.344 / s : null)),
    [series.speed_mps]
  );
  const elevation = useMemo(
    () => series.elevation_m.map((e) => (e === null ? null : e * 3.28084)),
    [series.elevation_m]
  );

  if (xMiles.length < 2) return null;
  const totalMiles = Math.max(xMiles[xMiles.length - 1], miles(run.distance_m));
  const shared = { xMiles, totalMiles, hover, onHover: setHover };

  return (
    <div className='grid gap-5'>
      <SeriesChart
        title='Pace'
        values={pace}
        format={(v) => `${formatPaceSeconds(v)} /mi`}
        invert
        {...shared}
      />
      <SeriesChart
        title='Heart rate'
        values={series.heart_rate}
        format={(v) => `${Math.round(v)} bpm`}
        {...shared}
      />
      <SeriesChart
        title='Elevation'
        values={elevation}
        format={(v) => `${Math.round(v)} ft`}
        area
        {...shared}
      />
    </div>
  );
}

// --- Splits & zones -----------------------------------------------------------

function Splits({ details }: { details: RunDetails }) {
  const rows = details.splits.map((split, index) => {
    const pace = paceSeconds(split.distance_m, split.moving_time_s);
    const partial = miles(split.distance_m) < 0.95;
    return { split, index, pace, partial };
  });
  if (!rows.length) return null;
  const fastest = Math.min(...rows.map((row) => row.pace));
  const slowest = Math.max(...rows.map((row) => row.pace));

  return (
    <table className='w-full text-sm'>
      <thead>
        <tr className={tinyLabel}>
          <th className='pb-2 text-left font-normal'>Mile</th>
          <th className='pb-2 text-left font-normal'>Pace</th>
          <th className='w-1/2 pb-2 font-normal'>
            <span className='sr-only'>Relative pace</span>
          </th>
          <th className='pb-2 text-right font-normal'>HR</th>
          <th className='pb-2 text-right font-normal'>Elev</th>
        </tr>
      </thead>
      <tbody className='tabular-nums text-gray-800 dark:text-gray-200'>
        {rows.map(({ split, index, pace, partial }) => {
          // Longer bar = faster; the slowest split still gets a sliver.
          const width =
            slowest === fastest
              ? 100
              : 30 + ((slowest - pace) / (slowest - fastest)) * 70;
          const net =
            (split.elevation_gain_m ?? 0) - (split.elevation_loss_m ?? 0);
          return (
            <tr
              key={index}
              className='border-t border-gray-200 dark:border-gray-700'
            >
              <td className='py-1.5'>
                {partial ? miles(split.distance_m).toFixed(2) : index + 1}
              </td>
              <td className='py-1.5'>{formatPaceSeconds(pace)}</td>
              <td className='py-1.5 pr-3'>
                <div
                  className='h-2 rounded-r-full bg-[var(--main)]'
                  style={{
                    width: `${width}%`,
                    opacity: pace === fastest ? 1 : 0.55,
                  }}
                />
              </td>
              <td className='py-1.5 text-right'>{split.avg_hr ?? '—'}</td>
              <td className='py-1.5 text-right'>
                {net > 0 ? '+' : ''}
                {feet(net)} ft
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const ZONE_OPACITY = [0.18, 0.36, 0.55, 0.78, 1];

function HeartRateZones({ zones }: { zones: number[] }) {
  const total = zones.reduce((sum, z) => sum + z, 0);
  if (!total) return null;

  return (
    <div>
      <div className='flex h-3 gap-[2px] overflow-hidden rounded-full'>
        {zones.map((seconds, i) =>
          seconds > 0 ? (
            <div
              key={i}
              className='h-full bg-[var(--main)]'
              style={{
                width: `${(seconds / total) * 100}%`,
                opacity: ZONE_OPACITY[i],
              }}
              title={`Zone ${i + 1}: ${formatDuration(seconds)}`}
            />
          ) : null
        )}
      </div>
      <ul className='mt-2 grid grid-cols-5 gap-1 text-xs text-gray-600 dark:text-gray-300'>
        {zones.map((seconds, i) => (
          <li key={i}>
            <span className='flex items-center gap-1.5'>
              <span
                className='h-2 w-2 shrink-0 rounded-full bg-[var(--main)]'
                style={{ opacity: ZONE_OPACITY[i] }}
                aria-hidden
              />
              Z{i + 1}
            </span>
            <span className='mt-0.5 block tabular-nums text-gray-400 dark:text-gray-500'>
              {Math.round((seconds / total) * 100)}%
              <br />
              {formatDuration(seconds)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className={`${metaLabel} mb-3`}>{title}</h3>
      {children}
    </section>
  );
}

// --- Detail view ----------------------------------------------------------------

export default function RunDetail({ run, dark }: { run: Run; dark: boolean }) {
  const details = run.details;
  const stats = statList(run, details);

  return (
    <div>
      <RouteMap route={run.route} dark={dark} width={720} height={320} />
      <div className='grid gap-8 p-5 sm:p-8'>
        <header>
          <p className={metaLabel}>
            <time dateTime={run.start_date_local}>
              {formatDate(run.start_date_local, 'long')}
            </time>
            {details?.location_name ? ` · ${details.location_name}` : ''}
          </p>
          <h2
            id={`run-${run.id}-title`}
            className='mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100'
          >
            {run.name}
          </h2>
        </header>

        <dl className='grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='min-w-0'>
              <dt className={tinyLabel}>{stat.label}</dt>
              <dd className='mt-0.5 truncate text-base tabular-nums text-gray-900 dark:text-gray-100'>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {details && details.series.distance_m.length > 1 && (
          <Block title='Over the run'>
            <Charts run={run} details={details} />
          </Block>
        )}

        <div className='grid gap-8 md:grid-cols-[3fr_2fr]'>
          {details && details.splits.length > 0 && (
            <Block title='Splits'>
              <Splits details={details} />
            </Block>
          )}
          {details && details.hr_zones_s.length === 5 && (
            <Block title='Heart rate zones'>
              <HeartRateZones zones={details.hr_zones_s} />
            </Block>
          )}
        </div>
      </div>
    </div>
  );
}
