import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BackButton from '@/components/BackButton';
import { blogPosts } from '@/data/services';
import blogImage from '@/assets/blog-image.jpg';

export default function BlogPage() {
  const [showRegister, setShowRegister] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      <Header />
      <main className="bg-aesop-parchment min-h-screen pt-[64px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <p className="eyebrow mb-6">· Recursos Editoriales</p>
          <h2 className="text-aesop-soil text-[40px] lg:text-[52px] mb-4">Blog</h2>
          <p className="text-body mb-16">Artículos sobre el mercado laboral y derecho laboral costarricense.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.map((post) => (
              <article key={post.id} style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }} className="pt-6">
                <div className="aspect-[3/2] overflow-hidden mb-6">
                  <img src={blogImage} alt={post.title} className="w-full h-full object-cover" loading="lazy" width={800} height={544} />
                </div>
                <p className="eyebrow-mono text-[10px]">{post.tag}</p>
                <h3 className="font-serif text-[24px] font-light text-aesop-soil mt-2 leading-snug">{post.title}</h3>
                <p className="font-mono text-[11px] text-aesop-taupe mt-2">{post.date}</p>
                <p className="text-body text-[14px] mt-3">{post.excerpt.slice(0, 150)}...</p>
                {!unlocked ? (
                  <button onClick={() => setShowRegister(true)} className="inline-block mt-4 font-sans text-[11px] uppercase tracking-[2px] text-aesop-soil hover:underline">
                    Leer más →
                  </button>
                ) : (
                  <p className="text-body text-[14px] mt-1">{post.excerpt.slice(150)}</p>
                )}
              </article>
            ))}
          </div>
        </div>

        {showRegister && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={() => setShowRegister(false)}>
            <div className="absolute inset-0" style={{ background: 'rgba(42,37,32,0.88)', backdropFilter: 'blur(6px)' }} />
            <div className="relative bg-aesop-parchment w-full max-w-[480px] mx-4 p-10 lg:p-14" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowRegister(false)} className="absolute top-6 right-6 text-aesop-taupe font-sans text-[18px]">✕</button>
              <h3 className="font-serif italic text-[28px] text-aesop-soil mb-8">Regístrate para leer</h3>
              <form onSubmit={e => { e.preventDefault(); setUnlocked(true); setShowRegister(false); }} className="space-y-6">
                <div>
                  <label className="label-mono text-aesop-clay block mb-2">Nombre</label>
                  <input className="aesop-input" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
                  <input type="email" className="aesop-input" placeholder="correo@ejemplo.com" required />
                </div>
                <button type="submit" className="btn-cta w-full">Registrarme</button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
