import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function InsiderClubPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-6 lg:py-8">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">· Comunidad</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">ADD Insider Club</h1>
          </div>
        </section>

        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[560px] mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-serif italic text-[32px] text-aesop-soil mb-6">Próximamente</h2>
            <p className="text-body">Estamos construyendo una comunidad exclusiva para profesionales y líderes de RR.HH. en Costa Rica. Déjanos tu correo para ser de los primeros.</p>
            <div className="mt-8 flex gap-4 max-w-[400px] mx-auto">
              <input className="aesop-input flex-1" placeholder="tu@correo.com" />
              <button className="btn-cta">Unirme</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
