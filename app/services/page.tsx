import Navbar from "@/components/Navbar";
import Services from "@/components/sections/Services";

export default function ServicesPage() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <Services />
    </main>
  );
}
