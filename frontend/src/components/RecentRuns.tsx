'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { analyticsAttributes } from '@/lib/analytics';
import { formatDate } from '@/lib/format';
import { metaLabel, underlineLink } from '@/lib/styles';

export interface Run {
  id: number;
  name: string;
  start_date_local: string;
  distance_m: number;
  moving_time_s: number;
  elevation_gain_m: number;
  /** [[lat, lng], ...], ends already trimmed server-side for privacy. */
  route: [number, number][];
  strava_url: string;
}

const RUN_COUNT = 3;
const API_URL = `${
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fast.adamsulemanji.com'
}/strava/runs?limit=${RUN_COUNT}`;

const METERS_PER_MILE = 1609.344;
const FEET_PER_METER = 3.28084;

// --- Static slippy map --------------------------------------------------------
// The route is drawn as SVG over a hand-placed grid of raster tiles: no map
// library, no API key, nothing interactive to trap scrolling. Everything is
// laid out in a fixed logical box and scaled with CSS percentages.
const MAP_W = 400;
const MAP_H = 240;
const TILE = 256; // Web Mercator pixels per tile at the layout zoom
// Tiles are fetched one zoom level deeper and drawn at half size, so the
// 256px rasters stay sharp on 2x screens.
const TILE_DRAWN = TILE / 2;
// Esri canvas basemaps: muted light/dark gray, free and keyless.
const MAX_LAYOUT_ZOOM = 15;
const tileUrl = (dark: boolean, z: number, x: number, y: number) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${
    dark ? 'Dark' : 'Light'
  }_Gray_Base/MapServer/tile/${z}/${y}/${x}`;
const FIT = 0.8; // route fills at most 80% of the box on each axis

function project(lat: number, lng: number, zoom: number): [number, number] {
  const scale = TILE * 2 ** zoom;
  const sin = Math.sin((lat * Math.PI) / 180);
  return [
    ((lng + 180) / 360) * scale,
    (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  ];
}

function layoutMap(route: [number, number][]) {
  let zoom = MAX_LAYOUT_ZOOM;
  let points: [number, number][] = [];
  for (; zoom > 2; zoom--) {
    points = route.map(([lat, lng]) => project(lat, lng, zoom));
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    if (
      Math.max(...xs) - Math.min(...xs) <= MAP_W * FIT &&
      Math.max(...ys) - Math.min(...ys) <= MAP_H * FIT
    )
      break;
  }

  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const originX = (Math.min(...xs) + Math.max(...xs)) / 2 - MAP_W / 2;
  const originY = (Math.min(...ys) + Math.max(...ys)) / 2 - MAP_H / 2;

  const tiles: { x: number; y: number; left: number; top: number }[] = [];
  const max = 2 ** (zoom + 1);
  for (
    let ty = Math.floor(originY / TILE_DRAWN);
    ty * TILE_DRAWN < originY + MAP_H;
    ty++
  ) {
    for (
      let tx = Math.floor(originX / TILE_DRAWN);
      tx * TILE_DRAWN < originX + MAP_W;
      tx++
    ) {
      if (ty < 0 || ty >= max) continue;
      tiles.push({
        x: ((tx % max) + max) % max,
        y: ty,
        left: tx * TILE_DRAWN - originX,
        top: ty * TILE_DRAWN - originY,
      });
    }
  }

  const path = points
    .map(
      ([x, y], i) =>
        `${i ? 'L' : 'M'}${(x - originX).toFixed(1)} ${(y - originY).toFixed(1)}`
    )
    .join(' ');
  const start = [points[0][0] - originX, points[0][1] - originY];
  const end = [
    points[points.length - 1][0] - originX,
    points[points.length - 1][1] - originY,
  ];

  return { zoom, tiles, path, start, end };
}

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

function RouteMap({ route, dark }: { route: Run['route']; dark: boolean }) {
  const { zoom, tiles, path, start, end } = layoutMap(route);

  return (
    <div
      className='relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700'
      style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
    >
      {tiles.map((tile) => (
        // eslint-disable-next-line @next/next/no-img-element -- static export; third-party tiles
        <img
          key={`${dark}-${zoom}-${tile.x}-${tile.y}-${tile.left}`}
          src={tileUrl(dark, zoom + 1, tile.x, tile.y)}
          alt=''
          loading='lazy'
          decoding='async'
          draggable={false}
          className='absolute max-w-none select-none'
          style={{
            left: pct(tile.left, MAP_W),
            top: pct(tile.top, MAP_H),
            width: pct(TILE_DRAWN, MAP_W),
            height: pct(TILE_DRAWN, MAP_H),
          }}
        />
      ))}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        className='absolute inset-0 h-full w-full'
        aria-hidden
      >
        <path
          d={path}
          fill='none'
          stroke='var(--main)'
          strokeWidth={3}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx={start[0]} cy={start[1]} r={4} fill='var(--main)' />
        <circle
          cx={end[0]}
          cy={end[1]}
          r={4}
          fill={dark ? '#1c1c1c' : '#ffffff'}
          stroke='var(--main)'
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}

// --- Formatting -------------------------------------------------------------------

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  const mmss = `${String(m).padStart(h ? 2 : 1, '0')}:${String(s).padStart(2, '0')}`;
  return h ? `${h}:${mmss}` : mmss;
}

function formatPace(meters: number, seconds: number) {
  if (!meters) return '—';
  const perMile = Math.round(seconds / (meters / METERS_PER_MILE));
  return `${Math.floor(perMile / 60)}:${String(perMile % 60).padStart(2, '0')} /mi`;
}

// --- Components -------------------------------------------------------------------

function RunCard({ run, dark }: { run: Run; dark: boolean }) {
  const stats = [
    {
      label: 'Distance',
      value: `${(run.distance_m / METERS_PER_MILE).toFixed(2)} mi`,
    },
    { label: 'Pace', value: formatPace(run.distance_m, run.moving_time_s) },
    { label: 'Time', value: formatDuration(run.moving_time_s) },
    {
      label: 'Elev',
      value: `${Math.round(run.elevation_gain_m * FEET_PER_METER)} ft`,
    },
  ];

  return (
    <li>
      <a
        href={run.strava_url}
        target='_blank'
        rel='noopener noreferrer'
        className='group block h-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-transform hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800'
        {...analyticsAttributes('run_clicked', { label: run.name })}
      >
        <RouteMap route={run.route} dark={dark} />
        <div className='p-4'>
          <p className={metaLabel}>
            <time dateTime={run.start_date_local}>
              {formatDate(run.start_date_local)}
            </time>
          </p>
          <p className='mt-1 truncate font-bold text-gray-900 dark:text-gray-100'>
            {run.name}
          </p>
          <dl className='mt-3 grid grid-cols-2 gap-x-4 gap-y-3'>
            {stats.map((stat) => (
              <div key={stat.label} className='min-w-0'>
                <dt className='text-[10px] uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500'>
                  {stat.label}
                </dt>
                <dd className='mt-0.5 truncate text-sm text-gray-800 dark:text-gray-200'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className='mt-3 text-xs font-semibold text-[#fc5200]'>
            View on Strava
          </p>
        </div>
      </a>
    </li>
  );
}

const gridClass = 'grid grid-cols-1 gap-4 md:grid-cols-3';

function RunsSkeleton() {
  return (
    <div className={gridClass} aria-label='Loading recent runs'>
      {Array.from({ length: RUN_COUNT }, (_, index) => (
        <div
          key={index}
          className='h-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800'
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function RecentRuns() {
  const { resolvedTheme } = useTheme();
  const [runs, setRuns] = useState<Run[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadRuns() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok)
          throw new Error(`Strava API returned ${response.status}`);
        const data: unknown = await response.json();
        setRuns(Array.isArray(data) ? (data as Run[]) : []);
        setStatus('ready');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setStatus('error');
      }
    }

    void loadRuns();
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <RunsSkeleton />;

  if (status === 'error' || runs.length === 0) {
    return (
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        {status === 'error'
          ? 'Unable to load runs right now. Check back later.'
          : 'No recent runs to show.'}
      </p>
    );
  }

  return (
    <>
      <ul className={gridClass}>
        {runs.map((run) => (
          <RunCard key={run.id} run={run} dark={resolvedTheme === 'dark'} />
        ))}
      </ul>
      <p className='mt-4 text-[11px] text-gray-400 dark:text-gray-500'>
        Powered by Strava · Maps ©{' '}
        <a
          href='https://www.esri.com/'
          target='_blank'
          rel='noopener noreferrer'
          className={underlineLink}
        >
          Esri
        </a>
        , HERE, Garmin, ©{' '}
        <a
          href='https://www.openstreetmap.org/copyright'
          target='_blank'
          rel='noopener noreferrer'
          className={underlineLink}
        >
          OpenStreetMap
        </a>{' '}
        contributors
      </p>
    </>
  );
}
