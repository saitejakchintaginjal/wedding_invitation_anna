// Floral corner ornament for the top of the hero. Pass `flip` to mirror it into the top-right corner.
export default function FloralCorner({ flip = false }: { flip?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/floral-corner.png"
      alt=""
      aria-hidden
      className={`pointer-events-none absolute top-0 z-[5] h-auto w-[34vw] max-w-[150px] ${flip ? "right-0 -scale-x-100" : "left-0"}`}
    />
  );
}
