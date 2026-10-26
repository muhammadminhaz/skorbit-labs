import Navbar from "@/components/Navbar";
import Testimonials from "@/components/sections/Testimonials";

export default function TestimonialsPage() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <Testimonials />
    </main>
  );
}
