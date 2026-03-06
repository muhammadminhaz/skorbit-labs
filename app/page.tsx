import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";

const Philosophy = dynamic(() => import("@/components/sections/Philosophy"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Process = dynamic(() => import("@/components/sections/Process"));
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
    return (
        <main className="bg-white text-slate-800 selection:bg-sky-100 selection:text-slate-900">
            <Navbar/>
            <Hero/>
            <Philosophy/>
            <FeaturedWork/>
            <Services/>
            <Process/>
            <Testimonials/>
            <Footer/>
        </main>
    );
}
