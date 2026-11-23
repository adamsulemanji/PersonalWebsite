/** Types and formatting for the Running section (data from the /runs API). */

export interface RunSplit {
  distance_m: number;
  moving_time_s: number;
  avg_hr?: number | null;
  elevation_gain_m?: number | null;
  elevation_loss_m?: number | null;
}

/** Parallel arrays indexed by distance; nulls where the watch had no reading. */
export interface RunSeries {
  distance_m: (number | null)[];
  elevation_m: (number | null)[];
  heart_rate: (number | null)[];
  speed_mps: (number | null)[];
}

export interface RunDetails {
  location_name?: string | null;
  avg_hr?: number | null;
  max_hr?: number | null;
  calories?: number | null;
  avg_cadence_spm?: number | null;
  avg_stride_cm?: number | null;
  avg_power_w?: number | null;
  vo2max?: number | null;
  aerobic_training_effect?: number | null;
  training_effect_label?: string | null;
  training_load?: number | null;
  fastest_mile_s?: number | null;
  steps?: number | null;
  hr_zones_s: number[];
  splits: RunSplit[];
  series: RunSeries;
}

export interface Run {
  id: number;
  name: string;
  start_date_local: string;
  distance_m: number;
  moving_time_s: number;
  elevation_gain_m: number;
  /** [[lat, lng], ...], ends already trimmed server-side for privacy. */
  route: [number, number][];
  details?: RunDetails | null;
}

export const METERS_PER_MILE = 1609.344;
export const FEET_PER_METER = 3.28084;

export const miles = (meters: number) => meters / METERS_PER_MILE;
export const feet = (meters: number) => Math.round(meters * FEET_PER_METER);

export function formatDuration(totalSeconds: number) {
  const total = Math.round(totalSeconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mmss = `${String(m).padStart(h ? 2 : 1, '0')}:${String(s).padStart(2, '0')}`;
  return h ? `${h}:${mmss}` : mmss;
}

/** Seconds per mile -> "8:25". */
export function formatPaceSeconds(secondsPerMile: number) {
  const total = Math.round(secondsPerMile);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export function paceSeconds(meters: number, seconds: number) {
  return meters ? seconds / miles(meters) : 0;
}

export function formatPace(meters: number, seconds: number) {
  return meters
    ? `${formatPaceSeconds(paceSeconds(meters, seconds))} /mi`
    : '—';
}

/** Garmin's "VO2MAX" / "LACTATE_THRESHOLD" -> "VO2 Max" / "Lactate Threshold". */
export function formatLabel(value?: string | null) {
  if (!value) return null;
  return value
    .toLowerCase()
    .split('_')
    .map((word) =>
      word === 'vo2max' ? 'VO2 Max' : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
}
