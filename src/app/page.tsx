import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import MenuPreview from "@/components/MenuPreview";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ramta-dark text-ramta-text font-heebo">
      <Navbar />
      <Hero />
      <OurStory />
      <MenuPreview />
      <Location />
      <Footer />
    </main>
  );
}
