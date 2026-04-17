import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';

export default function EmpresaPage() {
  const empresaServices = services.filter(s => s.category === 'empresa');

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-12 lg:py-16">
          <div className="max-w-[900px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">· Para empresas</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">
              Soluciones para tu empresa
            </h1>
            <p className="font-sans text-[15px] font-light mt-6" style={{ color: 'rgba(242,237,228,0.7)', lineHeight: '1.8' }}>
              Desde la formalización de tu gestión de personas hasta el blindaje legal completo.
            </p>
          </div>
        </section>

        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[900px] mx-auto px-6 lg:px-12">
            {empresaServices.map((s) => (
              <Link
                key={s.id}
                to={`/empresa/${s.slug}`}
                className="block py-8 group"
                style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}
              >
                <p className="eyebrow-mono text-[10px]">Ideal para: {s.idealFor}</p>
                <h3 className="font-serif text-[28px] font-light text-aesop-soil mt-2 group-hover:text-aesop-clay transition-colors duration-200">{s.name}</h3>
                <p className="text-body mt-2">{s.description.slice(0, 120)}...</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
