import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-aesop-bark py-16 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 — Logo */}
          <div>
            <Link to="/" className="font-serif text-[20px] font-light text-aesop-parchment tracking-tight">
              ADD Consulting
            </Link>
            <p className="font-sans text-[13px] mt-4 leading-relaxed" style={{ color: 'rgba(242,237,228,0.6)' }}>
              Consultoría boutique de RR.HH.<br />y Derecho Laboral en Costa Rica.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="LinkedIn" style={{ color: 'rgba(242,237,228,0.6)' }} className="hover:text-aesop-parchment transition-colors duration-200">
                <Linkedin size={18} strokeWidth={1} />
              </a>
              <a href="#" aria-label="Instagram" style={{ color: 'rgba(242,237,228,0.6)' }} className="hover:text-aesop-parchment transition-colors duration-200">
                <Instagram size={18} strokeWidth={1} />
              </a>
            </div>
          </div>

          {/* Col 2 — Soy Empresa */}
          <div>
            <h4 className="eyebrow-mono mb-6">Soy Empresa</h4>
            {[
              { label: 'Strategic Partner', to: '/empresa/strategic-partner' },
              { label: 'Corporative Essentials', to: '/empresa/essentials' },
              { label: 'Reclutamiento', to: '/empresa/reclutamiento' },
              { label: 'Risk & Compliance', to: '/empresa/risk-compliance' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block font-sans text-[13px] mb-3 transition-colors duration-200 hover:text-aesop-parchment" style={{ color: 'rgba(242,237,228,0.6)' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Soy Candidato */}
          <div>
            <h4 className="eyebrow-mono mb-6">Soy Candidato</h4>
            {[
              { label: 'ADD Grow', to: '/candidato/add-grow' },
              { label: 'ADD First Step', to: '/candidato/first-step' },
              { label: 'Simulaciones', to: '/candidato/simulaciones' },
              { label: 'Ver Vacantes', to: '/vacantes' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block font-sans text-[13px] mb-3 transition-colors duration-200 hover:text-aesop-parchment" style={{ color: 'rgba(242,237,228,0.6)' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 4 — Recursos */}
          <div>
            <h4 className="eyebrow-mono mb-6">Recursos</h4>
            {[
              { label: 'HR Toolkit', to: '/recursos/hr-toolkit' },
              { label: 'Career Blueprint', to: '/recursos/career-blueprint' },
              { label: 'Insider Club', to: '/recursos/insider-club' },
              { label: 'Blog', to: '/recursos/blog' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block font-sans text-[13px] mb-3 transition-colors duration-200 hover:text-aesop-parchment" style={{ color: 'rgba(242,237,228,0.6)' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16" style={{ borderTop: '1px solid rgba(242,237,228,0.12)' }}>
          <p className="font-mono text-[11px] text-aesop-taupe pt-8">
            © 2025 ADD Consulting · Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}
