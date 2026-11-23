import type { Run } from '@/lib/runs';

// The route is drawn as SVG over a hand-placed grid of raster tiles: no map
// library, no API key, nothing interactive to trap scrolling. Everything is
// laid out in a fixed logical box and scaled with CSS percentages.
const TILE = 256; // Web Mercator pixels per tile at the layout zoom
// Tiles are fetched one zoom level deeper and drawn at half size, so the
// 256px rasters stay sharp on 2x screens.
const TILE_DRAWN = TILE / 2;
const MAX_LAYOUT_ZOOM = 15;
const FIT = 0.8; // route fills at most 80% of the box on each axis

// Esri canvas basemaps: muted light/dark gray, free and keyless.
const tileUrl = (dark: boolean, z: number, x: number, y: number) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${
    dark ? 'Dark' : 'Light'
  }_Gray_Base/MapServer/tile/${z}/${y}/${x}`;

function project(lat: number, lng: number, zoom: number): [number, number] {
  const scale = TILE * 2 ** zoom;
  const sin = Math.sin((lat * Math.PI) / 180);
  return [
    ((lng + 180) / 360) * scale,
    (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  ];
}

function layoutMap(route: [number, number][], width: number, height: number) {
  let zoom = MAX_LAYOUT_ZOOM;
  let points: [number, number][] = [];
  for (; zoom > 2; zoom--) {
    points = route.map(([lat, lng]) => project(lat, lng, zoom));
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    if (
      Math.max(...xs) - Math.min(...xs) <= width * FIT &&
      Math.max(...ys) - Math.min(...ys) <= height * FIT
    )
      break;
  }

  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const originX = (Math.min(...xs) + Math.max(...xs)) / 2 - width / 2;
  const originY = (Math.min(...ys) + Math.max(...ys)) / 2 - height / 2;

  const tiles: { x: number; y: number; left: number; top: number }[] = [];
  const max = 2 ** (zoom + 1);
  for (
    let ty = Math.floor(originY / TILE_DRAWN);
    ty * TILE_DRAWN < originY + height;
    ty++
  ) {
    for (
      let tx = Math.floor(originX / TILE_DRAWN);
      tx * TILE_DRAWN < originX + width;
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
  const last = points[points.length - 1];
  return {
    zoom,
    tiles,
    path,
    start: [points[0][0] - originX, points[0][1] - originY],
    end: [last[0] - originX, last[1] - originY],
  };
}

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Static route map. `width`/`height` are the logical layout box (they set the
 * aspect ratio and how much map is shown); the rendered size is fluid.
 */
export default function RouteMap({
  route,
  dark,
  width = 400,
  height = 240,
}: {
  route: Run['route'];
  dark: boolean;
  width?: number;
  height?: number;
}) {
  const { zoom, tiles, path, start, end } = layoutMap(route, width, height);

  return (
    <div
      className='relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700'
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* One layer for tiles + route so hover zoom keeps them aligned. */}
      <div className='run-map-layer absolute inset-0'>
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
              left: pct(tile.left, width),
              top: pct(tile.top, height),
              width: pct(TILE_DRAWN, width),
              height: pct(TILE_DRAWN, height),
            }}
          />
        ))}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className='absolute inset-0 h-full w-full'
          aria-hidden
        >
          <path
            className='run-route'
            d={path}
            pathLength={1}
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
    </div>
  );
}
