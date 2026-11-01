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
      {/* phone-width column; on larger screens it sits centred like a card */}
      <div className="walk mx-auto w-full max-w-[480px] overflow-hidden bg-[linear-gradient(180deg,#fff7ea_0%,#fbe9cd_50%,#fff7ea_100%)] shadow-2xl">
        <Invitation />
        <GardenFinale />
      </div>
    </main>
  );
}
