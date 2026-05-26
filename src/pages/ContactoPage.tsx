import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import BackButton from '@/components/BackButton';
import BookingForm from '@/components/BookingForm';
import { useI18n } from '@/i18n/context';

export default function ContactoPage() {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const defaultService = params.get('service') || '';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-6 lg:py-8">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <BackButton />
            <p className="eyebrow-mono text-aesop-parchment mb-4 mt-4">· Agenda una cita</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">
              Hablemos
            </h1>
          </div>
        </section>

        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[560px] mx-auto px-6 lg:px-12">
            <h2 className="font-serif italic text-[32px] text-aesop-soil mb-3">
              Agenda tu cita
            </h2>
            <p className="text-body mb-8">
              Reserva un espacio de 30 minutos según disponibilidad real en nuestro calendario.
            </p>

            <BookingForm
              defaultService={defaultService}
              serviceOptions={t.floatingCta.serviceOptions}
            />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
