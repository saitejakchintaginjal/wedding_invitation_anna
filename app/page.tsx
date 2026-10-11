import GardenFinale from "@/components/GardenFinale";
import Invitation from "@/components/Invitation";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#ead9b8]">
      {/* phone-width column; on larger screens it sits centred like a card */}
      <div className="mx-auto w-full max-w-[480px] overflow-hidden bg-[linear-gradient(180deg,#fff7ea_0%,#fbe9cd_50%,#fff7ea_100%)] shadow-2xl">
        <Invitation />
        <GardenFinale />
      </div>
    </main>
  );
}
