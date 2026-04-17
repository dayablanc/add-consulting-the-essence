import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useParams } from 'react-router-dom';
import { digitalProducts } from '@/data/services';

export default function RecursoPage() {
  const { slug } = useParams();
  const product = digitalProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-[64px] bg-aesop-parchment flex items-center justify-center">
          <p className="text-body">Recurso no encontrado.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-12 lg:py-16">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">· Producto Digital</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">{product.name}</h1>
            <p className="label-mono text-aesop-taupe mt-4">{product.audience}</p>
          </div>
        </section>

        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[560px] mx-auto px-6 lg:px-12 text-center">
            <p className="text-body text-[16px]">{product.description}</p>
            <p className="font-mono text-[28px] text-aesop-soil mt-8">{product.price}</p>
            <button className="btn-cta mt-8">Obtener →</button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
