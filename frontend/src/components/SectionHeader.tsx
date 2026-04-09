export default function SectionHeader({ title }: { title: string }) {
  return (
    <p className='mb-6 text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500'>
      {title}
    </p>
  );
}
