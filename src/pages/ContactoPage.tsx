import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export default function ContactoPage() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const onSubmit = () => {
    toast({ title: '¡Listo!', description: 'Te contactaremos en menos de 24 horas.' });
    reset();
  };

  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const slots = ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[64px]">
        <section className="bg-aesop-bark py-24 lg:py-32">
          <div className="max-w-[700px] mx-auto px-6 lg:px-12">
            <p className="eyebrow-mono text-aesop-clay mb-4">· Contacto</p>
            <h1 className="text-aesop-parchment text-[40px] lg:text-[56px] font-serif font-light">Hablemos</h1>
          </div>
        </section>

        <section className="bg-aesop-white py-20 lg:py-28">
          <div className="max-w-[560px] mx-auto px-6 lg:px-12">
            <h2 className="font-serif italic text-[32px] text-aesop-soil mb-8">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Nombre</label>
                <input {...register('name')} className="aesop-input" placeholder="Tu nombre" required />
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
                <input {...register('email')} type="email" className="aesop-input" placeholder="correo@ejemplo.com" required />
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Tipo</label>
                <select {...register('type')} className="aesop-input">
                  <option value="">Seleccionar...</option>
                  <option value="empresa">Soy Empresa</option>
                  <option value="candidato">Soy Candidato</option>
                </select>
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Mensaje</label>
                <textarea {...register('message')} className="aesop-input min-h-[120px] resize-none" placeholder="¿Cómo podemos ayudarte?" />
              </div>
              <button type="submit" className="btn-cta w-full">Enviar consulta</button>
            </form>
          </div>
        </section>

        {/* Calendar section */}
        <section className="bg-aesop-parchment py-20 lg:py-28">
          <div className="max-w-[560px] mx-auto px-6 lg:px-12 text-center">
            <p className="eyebrow mb-4">· Agenda directamente</p>
            <h2 className="font-serif italic text-[32px] text-aesop-soil mb-6">Agenda una llamada exploratoria</h2>
            <p className="text-body mb-8">30 minutos sin compromiso para entender tu situación.</p>

            {!showCalendar ? (
              <button onClick={() => setShowCalendar(true)} className="btn-cta">
                Seleccionar horario
              </button>
            ) : (
              <div className="text-left" style={{ border: '1px solid hsl(var(--aesop-rule))', padding: '32px' }}>
                <p className="label-mono text-aesop-clay mb-4">Selecciona un día (Abril 2025)</p>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {days.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className="w-10 h-10 flex items-center justify-center font-mono text-[13px] transition-colors duration-200 cursor-pointer"
                      style={{
                        background: selectedDay === d ? 'hsl(var(--aesop-clay))' : 'transparent',
                        color: selectedDay === d ? 'hsl(var(--aesop-parchment))' : 'hsl(var(--aesop-soil))',
                        border: '1px solid hsl(var(--aesop-rule))',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {selectedDay && (
                  <>
                    <p className="label-mono text-aesop-clay mb-4">Selecciona un horario</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {slots.map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSlot(s)}
                          className="py-3 font-mono text-[13px] transition-colors duration-200 cursor-pointer"
                          style={{
                            background: selectedSlot === s ? 'hsl(var(--aesop-clay))' : 'transparent',
                            color: selectedSlot === s ? 'hsl(var(--aesop-parchment))' : 'hsl(var(--aesop-soil))',
                            border: '1px solid hsl(var(--aesop-rule))',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {selectedSlot && (
                      <button
                        className="btn-cta w-full"
                        onClick={() => {
                          toast({ title: '¡Agendado!', description: `Tu llamada queda para el ${selectedDay} de abril a las ${selectedSlot}.` });
                          setShowCalendar(false);
                        }}
                      >
                        Confirmar — {selectedDay} abril, {selectedSlot}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
