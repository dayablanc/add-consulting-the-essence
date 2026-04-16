import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-aesop-bark">
      <div className="max-w-[1200px] mx-auto section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Col 1 — Logo + tagline + socials */}
          <div>
            <Link to="/" className="font-serif text-[18px] font-light text-aesop-parchment tracking-tight">
              ADD Consulting
            </Link>
            <p className="font-sans text-[13px] mt-2" style={{ color: 'rgba(242,237,228,0.5)' }}>
              Consultoría boutique de RR.HH. y Derecho Laboral
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="LinkedIn" style={{ color: 'rgba(242,237,228,0.5)' }} className="hover:text-aesop-parchment transition-colors duration-200">
                <Linkedin size={16} strokeWidth={1} />
              </a>
              <a href="#" aria-label="Instagram" style={{ color: 'rgba(242,237,228,0.5)' }} className="hover:text-aesop-parchment transition-colors duration-200">
                <Instagram size={16} strokeWidth={1} />
              </a>
            </div>
          </div>

          {/* Col 2 — Links */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[2px] text-aesop-taupe mb-4">Navegación</p>
            {[
              { label: 'Soy Empresa', to: '/empresa' },
              { label: 'Soy Candidato', to: '/candidato' },
              { label: 'Recursos Digitales', to: '/recursos/hr-toolkit' },
              { label: 'Blog', to: '/recursos/blog' },
              { label: 'Sobre ADD', to: '/contacto' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block font-sans text-[13px] mb-2 transition-colors duration-200 hover:text-aesop-parchment" style={{ color: 'rgba(242,237,228,0.5)' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[2px] text-aesop-taupe mb-4">Contacto</p>
            <p className="font-sans text-[13px] mb-2" style={{ color: 'rgba(242,237,228,0.5)' }}>info@addconsulting.cr</p>
            <p className="font-sans text-[13px] mb-2" style={{ color: 'rgba(242,237,228,0.5)' }}>+506 8888-8888</p>
            <p className="font-sans text-[13px]" style={{ color: 'rgba(242,237,228,0.5)' }}>San José, Costa Rica</p>
          </div>
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(242,237,228,0.1)' }}>
          <p className="font-mono text-[10px]" style={{ color: 'rgba(242,237,228,0.35)' }}>
            © 2025 ADD Consulting · Costa Rica · Política de privacidad
          </p>
        </div>
      </div>
    </footer>
  );
}
