import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";

const Philosophy   = dynamic(() => import("@/components/sections/Philosophy"));
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const Services     = dynamic(() => import("@/components/sections/Services"));
const WhySkorbit   = dynamic(() => import("@/components/sections/WhySkorbit"));
const Process      = dynamic(() => import("@/components/sections/Process"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CTA          = dynamic(() => import("@/components/sections/CTA"));
const Footer       = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
    return (
        <main className="bg-[#0D0D0F] text-neutral-400 selection:bg-sky-900 selection:text-sky-200">
            <Navbar/>
            <Hero/>
            <Philosophy/>
            <FeaturedWork/>
            <Services/>
            <WhySkorbit/>
            <Process/>
            <Testimonials/>
            <Footer/>
        </main>
    );
}
