import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { vacantes } from '@/data/services';

export default function VacantesPage() {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('');
  const [zona, setZona] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const filtered = vacantes.filter(v => {
    if (area && v.area !== area) return false;
    if (zona && v.zona !== zona) return false;
    if (search && !v.titulo.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="bg-aesop-parchment min-h-screen pt-[64px]">
        <div className="max-w-[900px] mx-auto px-6 py-16 lg:py-24">
          <p className="eyebrow mb-6">· Oportunidades</p>
          <h2 className="text-aesop-soil text-[36px] lg:text-[48px] mb-12">Vacantes</h2>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 pb-8" style={{ borderBottom: '1px solid hsl(var(--aesop-rule))' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="aesop-input flex-1"
              placeholder="Buscar por título..."
            />
            <select value={area} onChange={e => setArea(e.target.value)} className="aesop-input md:w-[180px]">
              <option value="">Todas las áreas</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Legal">Legal</option>
              <option value="Administración">Administración</option>
            </select>
            <select value={zona} onChange={e => setZona(e.target.value)} className="aesop-input md:w-[180px]">
              <option value="">Todas las zonas</option>
              <option value="San José">San José</option>
              <option value="Heredia">Heredia</option>
              <option value="Cartago">Cartago</option>
              <option value="Alajuela">Alajuela</option>
            </select>
          </div>

          {/* Listings */}
          <div className="relative">
            {filtered.map((v, i) => {
              const isLocked = !unlocked && i >= 3;
              return (
                <div
                  key={v.id}
                  className="py-8 relative"
                  style={{
                    borderBottom: '1px solid hsl(var(--aesop-rule))',
                    filter: isLocked ? 'blur(5px)' : 'none',
                    pointerEvents: isLocked ? 'none' : 'auto',
                  }}
                >
                  <p className="eyebrow-mono text-[10px]">{v.area} · {v.zona}</p>
                  <h3 className="font-serif text-[24px] font-light text-aesop-soil mt-2">{v.titulo}</h3>
                  <p className="font-sans text-[13px] text-aesop-taupe mt-1">{v.empresa} · {v.publicado}</p>
                  <button className="font-sans text-[11px] uppercase tracking-[2px] text-aesop-soil mt-4 hover:underline transition-all duration-200">
                    Ver detalles →
                  </button>
                </div>
              );
            })}

            {/* Gatekeeping overlay */}
            {!unlocked && filtered.length > 3 && (
              <div className="absolute bottom-0 left-0 right-0 h-[400px] flex flex-col items-center justify-end pb-12"
                style={{ background: 'linear-gradient(to bottom, rgba(242,237,228,0) 0%, rgba(242,237,228,0.95) 60%)' }}
              >
                <p className="font-serif italic text-[24px] text-aesop-soil mb-6 text-center">
                  Regístrate para ver todas las vacantes
                </p>
                <button onClick={() => setShowRegister(true)} className="btn-cta">
                  Registrarme
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Register Modal */}
        {showRegister && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={() => setShowRegister(false)}>
            <div className="absolute inset-0" style={{ background: 'rgba(42,37,32,0.88)', backdropFilter: 'blur(6px)' }} />
            <div className="relative bg-aesop-parchment w-full max-w-[480px] mx-4 p-10 lg:p-14" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowRegister(false)} className="absolute top-6 right-6 text-aesop-taupe font-sans text-[18px]">✕</button>
              <h3 className="font-serif italic text-[28px] text-aesop-soil mb-8">Crear cuenta</h3>
              <form onSubmit={e => { e.preventDefault(); setUnlocked(true); setShowRegister(false); }} className="space-y-6">
                <div>
                  <label className="label-mono text-aesop-clay block mb-2">Nombre</label>
                  <input className="aesop-input" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
                  <input type="email" className="aesop-input" placeholder="correo@ejemplo.com" required />
                </div>
                <div>
                  <label className="label-mono text-aesop-clay block mb-2">Tipo</label>
                  <select className="aesop-input">
                    <option value="empresa">Empresa</option>
                    <option value="candidato">Candidato</option>
                  </select>
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
