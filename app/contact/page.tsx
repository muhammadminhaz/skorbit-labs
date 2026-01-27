import Navbar from "@/components/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
