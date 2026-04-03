export default function SectionHeader({ title }: { title: string }) {
  return (
    <p className='underline-offset-3 decoration-gray-300 group relative inline-block text-xl font-bold underline'>
      {title}
      <span className='bg-current absolute bottom-0 left-0 mt-1 block h-[2px] w-0 transition-all duration-300 group-hover:w-full' />
    </p>
  );
}
