export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-6 text-center">
      {eyebrow && <p className="text-[11px] uppercase tracking-[.4em] font-medium text-gold-dark drop-shadow-[0_0_8px_rgba(255,247,234,.9)]">{eyebrow}</p>}
      <h2 className="mt-1 font-serif text-4xl font-semibold text-maroon-deep drop-shadow-[0_0_12px_rgba(255,247,234,.9)]">{title}</h2>
      <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
