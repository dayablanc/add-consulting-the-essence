import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-aesop-bark">
      <div className="max-w-[1200px] mx-auto section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Col 1 */}
          <div>
            <Link to="/" className="font-serif text-[18px] font-light text-aesop-parchment tracking-tight leading-[1.1] block">
              ADD<br />
              <span className="text-[10px] font-sans tracking-[2px] opacity-70">PEOPLE ADVISORY</span>
            </Link>
            <p className="font-sans text-[13px] mt-2" style={{ color: 'rgba(242,237,228,0.5)' }}>
              {t.footer.tagline}
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

          {/* Col 2 */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[2px] text-aesop-taupe mb-4">{t.footer.navTitle}</p>
            {t.footer.links.map((l) => (
              <Link key={l.to} to={l.to} className="block font-sans text-[13px] mb-2 transition-colors duration-200 hover:text-aesop-parchment" style={{ color: 'rgba(242,237,228,0.5)' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[2px] text-aesop-taupe mb-4">{t.footer.contactTitle}</p>
            <p className="font-sans text-[13px] mb-2" style={{ color: 'rgba(242,237,228,0.5)' }}>info@addconsulting.cr</p>
            <p className="font-sans text-[13px] mb-2" style={{ color: 'rgba(242,237,228,0.5)' }}>+506 8888-8888</p>
            <p className="font-sans text-[13px]" style={{ color: 'rgba(242,237,228,0.5)' }}>San José, Costa Rica</p>
          </div>
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(242,237,228,0.1)' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="font-mono text-[10px]" style={{ color: 'rgba(242,237,228,0.35)' }}>
              {t.footer.copyright}
            </p>
            <p className="font-mono text-[10px]" style={{ color: 'rgba(242,237,228,0.25)' }}>
              {t.footer.currencyNote}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
