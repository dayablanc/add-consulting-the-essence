import { MessageSquare } from 'lucide-react';
import { useI18n } from '@/i18n/context';

const WHATSAPP_URL = 'https://wa.me/50689069915';

export default function FloatingCTA() {
  const { t } = useI18n();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[80] btn-cta flex items-center gap-2 !px-4 !py-3 md:!px-8 md:!py-3"
    >
      <MessageSquare size={16} strokeWidth={1.5} />
      <span className="hidden md:inline">{t.floatingCta.buttonLabel}</span>
    </a>
  );
}
