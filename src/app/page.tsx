import { ScrollProvider } from "@/lib/scroll-context";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { ScrollAnimations } from "@/components/effects/ScrollAnimations";
import { SceneLoader } from "@/components/three/SceneLoader";

export default function Home() {
  return (
    <ScrollProvider>
      <SmoothScroll>
        <div className="relative w-full" style={{ background: "#06060a" }}>
          {/* Fixed navbar */}
          <Navbar />

          {/* 3D scene — fixed behind content */}
          <SceneLoader />

          {/* Film grain overlay */}
          <FilmGrain />

          {/* GSAP scroll animation driver */}
          <ScrollAnimations />

          {/* Content sections */}
          <HeroSection />
          <CaseStudySection />
          <ServicesSection />

          <section
            className="relative w-full"
            style={{
              background: "#06060a",
              padding: "100px 0 120px",
              zIndex: 2,
            }}
          >
            <div
              className="relative mx-auto"
              style={{ maxWidth: "1280px", padding: "0 5vw" }}
            >
              <ProjectsSection />
              <ExperienceSection />
            </div>
          </section>

          <ContactSection />
        </div>
      </SmoothScroll>
    </ScrollProvider>
  );
}
