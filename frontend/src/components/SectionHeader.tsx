import { sectionLabel } from '@/lib/styles';

export default function SectionHeader({ title }: { title: string }) {
  return <h2 className={`mb-6 ${sectionLabel}`}>{title}</h2>;
}
