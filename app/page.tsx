import Gate from "@/components/Gate";
import FlowerShower from "@/components/FlowerShower";
import GardenFinale from "@/components/GardenFinale";
import Invitation from "@/components/Invitation";
import AutoScroll from "@/components/AutoScroll";
import MusicPlayer from "@/components/MusicPlayer";
import TapPetals from "@/components/TapPetals";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#ead9b8]">
      <Gate />
      <TapPetals />
      <MusicPlayer />
      <FlowerShower />
      <AutoScroll />
      {/* a column up to 640px wide (phones fill it; tablets and desktops see it centred). Every section inside is one full-screen slide. */}
      <div className="walk mx-auto w-full max-w-[640px] overflow-hidden bg-ivory shadow-2xl">
        <Invitation />
        <GardenFinale />
      </div>
    </main>
  );
}
