import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#fdfdfc] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <section id="hero" className="min-h-screen flex items-center justify-center border-b border-neutral-200">
        <h1>Hero</h1>
      </section>

      <section id="featured-work" className="min-h-screen flex items-center justify-center border-b border-neutral-200">
        <h2>Featured work</h2>
      </section>

      <section id="introduction" className="min-h-screen flex items-center justify-center border-b border-neutral-200">
        <h2>Introduction</h2>
      </section>

      <section id="services" className="min-h-screen flex items-center justify-center border-b border-neutral-200">
        <h2>Services (what we do)</h2>
      </section>

      <section id="testimonials" className="min-h-screen flex items-center justify-center border-b border-neutral-200">
        <h2>Testimonials</h2>
      </section>

      <div className="min-h-screen flex flex-col">
        <section id="contact" className="flex-1 flex items-center justify-center border-b border-neutral-200">
          <h2>Contact</h2>
        </section>

        <footer id="footer" className="flex-1 flex items-center justify-center">
          <h2>Footer</h2>
        </footer>
      </div>
    </main>
  );
}
