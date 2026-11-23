'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { ArrowUpRight, X } from 'lucide-react';
import RouteMap from '@/components/RouteMap';
import RunDetail from '@/components/RunDetail';
import { analyticsAttributes } from '@/lib/analytics';
import { formatDate } from '@/lib/format';
import { feet, formatDuration, formatPace, miles } from '@/lib/runs';
import type { Run } from '@/lib/runs';
import { metaLabel, underlineLink } from '@/lib/styles';
import { socials } from '@/assets/socials';
import '../styles/runs.css';

const RUN_COUNT = 3;
const STRAVA_PROFILE =
  socials.find((social) => social.id === 'strava')?.href ??
  'https://www.strava.com/athletes/109469044';
const API_URL = `${
  process.env.NEXT_PUBLIC_RUNS_API_URL ?? 'https://api.fast.adamsulemanji.com'
}/runs?limit=${RUN_COUNT}`;

function RunCard({
  run,
  dark,
  onOpen,
}: {
  run: Run;
  dark: boolean;
  onOpen: () => void;
}) {
  const stats = [
    { label: 'Distance', value: `${miles(run.distance_m).toFixed(2)} mi` },
    { label: 'Pace', value: formatPace(run.distance_m, run.moving_time_s) },
    { label: 'Time', value: formatDuration(run.moving_time_s) },
    { label: 'Elev', value: `${feet(run.elevation_gain_m)} ft` },
  ];

  return (
    <li>
      <button
        type='button'
        onClick={onOpen}
        aria-haspopup='dialog'
        className='run-card group block h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 text-left transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg focus-visible:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:shadow-black/40'
        {...analyticsAttributes('run_opened', { label: run.name })}
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
                <dd className='mt-0.5 truncate text-sm tabular-nums text-gray-800 dark:text-gray-200'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className='run-hint mt-3 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400'>
            Splits, heart rate &amp; more
            <ArrowUpRight className='h-3.5 w-3.5' aria-hidden />
          </p>
        </div>
      </button>
    </li>
  );
}

/** Native modal <dialog>: focus trap, Esc to close and inert page for free. */
function RunDialog({
  run,
  dark,
  onClose,
}: {
  run: Run | null;
  dark: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (run && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.documentElement.style.overflow = 'hidden';
    } else if (!run && dialog.open) {
      dialog.close();
    }
  }, [run]);

  const handleClose = useCallback(() => {
    document.documentElement.style.overflow = '';
    onClose();
  }, [onClose]);

  return (
    // Backdrop click is a pointer shortcut; Esc (native) is the keyboard path.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      onClose={handleClose}
      // A click on the dialog element itself (not its content) is the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
      aria-labelledby={run ? `run-${run.id}-title` : undefined}
      className='run-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(52rem,calc(100%-2rem))] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-background p-0 text-gray-900 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm dark:border-gray-700 dark:text-gray-100'
    >
      {run && (
        <div className='relative'>
          <button
            type='button'
            onClick={() => ref.current?.close()}
            className='absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-700 shadow transition hover:bg-white dark:bg-gray-900/90 dark:text-gray-200 dark:hover:bg-gray-900'
            aria-label='Close'
          >
            <X className='h-4 w-4' aria-hidden />
          </button>
          <RunDetail run={run} dark={dark} />
        </div>
      )}
    </dialog>
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
  const dark = resolvedTheme === 'dark';
  const [runs, setRuns] = useState<Run[]>([]);
  const [openRun, setOpenRun] = useState<Run | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );
  const closeRun = useCallback(() => setOpenRun(null), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRuns() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok)
          throw new Error(`Runs API returned ${response.status}`);
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
          <RunCard
            key={run.id}
            run={run}
            dark={dark}
            onOpen={() => setOpenRun(run)}
          />
        ))}
      </ul>
      <a
        href={STRAVA_PROFILE}
        target='_blank'
        rel='noopener noreferrer'
        className={`mt-4 inline-block text-sm text-gray-700 dark:text-gray-200 ${underlineLink}`}
        {...analyticsAttributes('social_link_clicked', {
          label: 'Strava (runs)',
        })}
      >
        More on Strava
      </a>
      <RunDialog run={openRun} dark={dark} onClose={closeRun} />
    </>
  );
}
