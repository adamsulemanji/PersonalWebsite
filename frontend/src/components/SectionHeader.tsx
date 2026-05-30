import { sectionLabel } from '@/lib/styles';

export default function SectionHeader({ title }: { title: string }) {
  return <p className={`mb-6 ${sectionLabel}`}>{title}</p>;
}
