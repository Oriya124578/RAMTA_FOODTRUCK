import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuView from "@/components/MenuView";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-ramta-ink text-ramta-text font-heebo">
      <Navbar />
      <MenuView />
      <Footer />
    </main>
  );
}
