import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CotizadorCTASection from '@/components/sections/CotizadorCTASection';
import KitPymeSection from '@/components/sections/KitPymeSection';
import StatsSection from '@/components/sections/StatsSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';

export default function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CotizadorCTASection />
        <KitPymeSection />
        <StatsSection />
        <BlogPreviewSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
