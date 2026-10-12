/** Renders a name with every capital letter (e.g. the S and K of SaiKiran, the A of Asha) set in a clear serif capital. */
export default function CapName({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={className}>
      {children.split("").map((c, i) =>
        c !== c.toLowerCase() ? (
          <span key={i} className="font-serif text-[1.05em] font-semibold italic leading-none">{c}</span>
        ) : (
          c
        ),
      )}
    </span>
  );
}
