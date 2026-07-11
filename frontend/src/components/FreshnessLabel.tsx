'use client';

import { useEffect, useState } from 'react';
import { metaLabel } from '@/lib/styles';

const STALE_AFTER_MONTHS = 4;

export default function FreshnessLabel({
  date,
  children,
}: {
  date: string;
  children: string;
}) {
  const [monthsOld, setMonthsOld] = useState<number | null>(null);

  useEffect(() => {
    const updated = new Date(`${date}T00:00:00`);
    const now = new Date();
    const months =
      (now.getFullYear() - updated.getFullYear()) * 12 +
      now.getMonth() -
      updated.getMonth();
    setMonthsOld(Math.max(0, months));
  }, [date]);

  return (
    <p className={`flex flex-wrap items-center gap-2 ${metaLabel}`}>
      <time dateTime={date}>{children}</time>
      {monthsOld !== null && monthsOld >= STALE_AFTER_MONTHS && (
        <span className='rounded-full bg-amber-100 px-2 py-1 text-[10px] text-amber-800 dark:bg-amber-950 dark:text-amber-300'>
          Review due
        </span>
      )}
    </p>
  );
}
