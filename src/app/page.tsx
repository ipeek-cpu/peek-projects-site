import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BringIt } from "@/components/sections/BringIt";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { HowIWork } from "@/components/sections/HowIWork";
import { About } from "@/components/sections/About";
import { Booking } from "@/components/sections/Booking";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <Hero />
      <BringIt />
      <SelectedWork />
      <HowIWork />
      <About />
      <Booking />
      <Footer />
    </main>
  );
}
