// Flowers that bloom into the four corners of the screen, one after another, once the gate has opened.
// On wide screens they fill the empty space beside the phone-width column.
const CORNERS = [
  { pos: "left-0 top-0", flip: "", origin: "0 0", delay: 11, rot: -14 },
  { pos: "right-0 top-0", flip: "-scale-x-100", origin: "100% 0", delay: 11.7, rot: 14 },
  { pos: "right-0 bottom-0", flip: "-scale-100", origin: "100% 100%", delay: 12.4, rot: -14 },
  { pos: "left-0 bottom-0", flip: "-scale-y-100", origin: "0 100%", delay: 13, rot: 14 },
];

export default function CornerFlowers() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-40 h-screen overflow-hidden [transform:translateZ(0)]">
      {CORNERS.map((c) => (
        <div key={c.pos} className={`absolute ${c.pos} ${c.flip}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/floral-corner.png"
            alt=""
            className="bloom h-auto w-[clamp(96px,28vw,300px)]"
            style={{ ["--bloom-d" as string]: `${c.delay}s`, ["--bloom-o" as string]: c.origin, ["--bloom-r" as string]: `${c.rot}deg` }}
          />
        </div>
      ))}
    </div>
  );
}
