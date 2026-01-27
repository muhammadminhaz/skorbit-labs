import Navbar from "@/components/Navbar";
import FeaturedWork from "@/components/sections/FeaturedWork";

export default function WorkPage() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <FeaturedWork />
    </main>
  );
}
