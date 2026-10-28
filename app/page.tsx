import type {Metadata} from "next";
import {pageMeta, DEFAULT_DESCRIPTION} from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";
import {FAQ_PAGE} from "@/lib/faqs";

export const metadata: Metadata = pageMeta({
    description: DEFAULT_DESCRIPTION,
    path: "/",
});

export default function Home() {
    return (
        <main>
            <JsonLd data={FAQ_PAGE}/>
            <Hero/>
            <FeaturedWork/>
            <WhoWeAre/>
            <Services/>
            <Process/>
            <FAQ/>
            <Contact/>
        </main>
    );
}
