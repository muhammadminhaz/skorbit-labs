import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import WhySkorbit from "@/components/sections/WhySkorbit";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
    return (
        <main className="bg-white text-slate-800 selection:bg-sky-100 selection:text-slate-900">
            <Navbar/>
            <Hero/>
            <Philosophy/>
            <FeaturedWork/>
            <Services/>
            <Process/>
            <WhySkorbit/>
            <Testimonials/>
            <CTA/>
            <Footer/>
        </main>
    );
}
