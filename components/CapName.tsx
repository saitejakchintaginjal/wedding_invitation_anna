/** Renders a name with the first letter of every word set as a larger capital. */
export default function CapName({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={className}>
      {children.split(" ").map((w, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className="font-serif text-[1.05em] font-semibold italic leading-none">{w[0].toUpperCase()}</span>{w.slice(1)}
        </span>
      ))}
    </span>
  );
}
