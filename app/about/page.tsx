import Navbar from "@/components/Navbar";
import Introduction from "@/components/sections/Introduction";

export default function AboutPage() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <Introduction />
    </main>
  );
}
