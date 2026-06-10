'use client';

import { useState, useEffect, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';

type Point = [number, number];

/** Build an SVG path through `points` with rounded corners of radius `r`. */
function roundedPath(points: Point[], r: number): string {
  if (points.length < 2) return '';
  const out: string[] = [`M ${points[0][0]} ${points[0][1]}`];

  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];

    const lenIn = Math.hypot(cx - px, cy - py) || 1;
    const lenOut = Math.hypot(nx - cx, ny - cy) || 1;
    const radius = Math.min(r, lenIn / 2, lenOut / 2);

    const inX = cx + ((px - cx) / lenIn) * radius;
    const inY = cy + ((py - cy) / lenIn) * radius;
    const outX = cx + ((nx - cx) / lenOut) * radius;
    const outY = cy + ((ny - cy) / lenOut) * radius;

    out.push(`L ${inX} ${inY}`);
    out.push(`Q ${cx} ${cy} ${outX} ${outY}`);
  }

  const [lx, ly] = points[points.length - 1];
  out.push(`L ${lx} ${ly}`);
  return out.join(' ');
}

interface ThreadGeometry {
  path: string;
  width: number;
  height: number;
}

// A single accent line that snakes down the page: it runs vertically along one
// edge beside a section, bends horizontally across the gap to the opposite
// edge, runs down beside the next section, and so on — drawing itself as you
// scroll. The path is measured from the real section positions, so every bend
// lands in the gap between two sections regardless of their heights.
export default function ScrollThread({
  contentRef,
}: {
  contentRef: RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  // Bind the draw directly to scroll progress (already rAF-synced) so the line
  // tracks the scroll position 1:1 — a spring here just adds lag and stepping.
  const { scrollYProgress } = useScroll();

  const [geometry, setGeometry] = useState<ThreadGeometry | null>(null);

  useEffect(() => {
    const container = contentRef.current;
    const outer = container?.parentElement;
    if (!container || !outer) return;

    const EDGE_INSET = 10; // px the vertical runs sit in from the page edges
    const SECTIONS_PER_BEND = 3; // sections the line runs past before bending

    const measure = () => {
      const width = outer.clientWidth;
      const height = outer.clientHeight;
      const sections = Array.from(container.children) as HTMLElement[];
      if (sections.length === 0) return;

      const left = EDGE_INSET;
      const right = width - EDGE_INSET;
      const baseTop = container.offsetTop;

      // y-boundaries: top of the first section, each gap midpoint, then the
      // bottom of the last section. Vertical runs span boundary[i]→boundary[i+1].
      const boundaries: number[] = [baseTop + sections[0].offsetTop];
      for (let i = 0; i < sections.length - 1; i++) {
        const bottom =
          baseTop + sections[i].offsetTop + sections[i].offsetHeight;
        const nextTop = baseTop + sections[i + 1].offsetTop;
        boundaries.push((bottom + nextTop) / 2);
      }
      const last = sections[sections.length - 1];
      boundaries.push(baseTop + last.offsetTop + last.offsetHeight);

      // Run down one edge past SECTIONS_PER_BEND sections, then bend across to
      // the other edge in the gap. Fewer bends = calmer zigzag. Each bend still
      // lands on a real gap boundary; the in-between boundaries are just points
      // along the straight vertical run.
      const points: Point[] = [];
      let run = 0;
      for (let start = 0; start < sections.length; start += SECTIONS_PER_BEND) {
        const end = Math.min(start + SECTIONS_PER_BEND, sections.length);
        const x = run % 2 === 0 ? left : right;
        points.push([x, boundaries[start]]);
        points.push([x, boundaries[end]]);
        run++;
      }

      setGeometry({ path: roundedPath(points, 160), width, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    observer.observe(container);
    return () => observer.disconnect();
  }, [contentRef]);

  if (!geometry) return null;

  const sharedPath = {
    d: geometry.path,
    fill: 'none',
    stroke: 'var(--main)',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    // Isolate this onto its own compositor layer (translateZ + will-change) and
    // contain its painting. Animating `pathLength` repaints the stroke every
    // scroll frame; without isolation that invalidates the shared layer and
    // re-rasterizes the page content sitting above it — the source of the lag.
    <div
      className='pointer-events-none absolute inset-0 z-0 hidden [contain:paint] [transform:translateZ(0)] [will-change:transform] md:block'
      aria-hidden
    >
      <svg
        className='h-full w-full'
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio='none'
      >
        {/* Faint full-length track so the path reads even before scrolling. */}
        <path {...sharedPath} className='opacity-[0.1]' />
        {/* Accent stroke that fills in with scroll progress. */}
        <motion.path
          {...sharedPath}
          className='opacity-60'
          style={{ pathLength: reduceMotion ? 1 : scrollYProgress }}
        />
      </svg>
    </div>
  );
}
