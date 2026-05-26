import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CotizadorCTASection from '@/components/sections/CotizadorCTASection';
import CalculadoraLaboral from '@/components/CalculadoraLaboral';
import KitPymeSection from '@/components/sections/KitPymeSection';
import StatsSection from '@/components/sections/StatsSection';
import CTAFinalSection from '@/components/sections/CTAFinalSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';

export default function Index() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <KitPymeSection />
        <CotizadorCTASection />
        <CalculadoraLaboral />
        <StatsSection />
        <BlogPreviewSection />
        <CTAFinalSection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
