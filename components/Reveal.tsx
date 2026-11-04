export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-u16 w-full text-center">
      {eyebrow && <p className="text-u11 font-medium uppercase tracking-[.4em] text-gold-dark">{eyebrow}</p>}
      <h2 className="mt-u2 font-serif text-u36 font-semibold leading-tight text-maroon-deep">{title}</h2>
      <div className="mx-auto mt-u10 flex items-center justify-center gap-u8 text-gold">
        <span className="h-px w-u44 bg-gradient-to-r from-transparent to-gold" />
        <span aria-hidden className="text-u9">&#10022;</span>
        <span className="h-px w-u44 bg-gradient-to-l from-transparent to-gold" />
      </div>
    </div>
  );
}
