import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Introduction from "@/components/sections/Introduction";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <Hero />
      <FeaturedWork />
      <Introduction />
      <Services />
      <Testimonials />

      <div className="min-h-screen flex flex-col">
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
