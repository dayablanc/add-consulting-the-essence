import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export default function ContactoPage() {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');

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
            <h2 className="font-serif italic text-[32px] text-aesop-soil mb-3">Envíanos un mensaje y agenda tu cita</h2>
            <p className="text-body mb-8">Completa tus datos y reserva un espacio de 30 minutos sin compromiso.</p>
            <form
              onSubmit={handleSubmit(() => {
                if (!selectedDay || !selectedSlot) {
                  toast({ title: 'Selecciona fecha y horario', description: 'Por favor elige un día y una hora para tu cita.' });
                  return;
                }
                toast({ title: '¡Listo!', description: `Tu cita queda para el ${selectedDay} de abril a las ${selectedSlot}. Te confirmaremos por correo.` });
                reset();
                setSelectedDay(null);
                setSelectedSlot('');
              })}
              className="space-y-6"
            >
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

              {/* Calendar embedded */}
              <div className="pt-4" style={{ borderTop: '1px solid hsl(var(--aesop-rule))' }}>
                <p className="eyebrow-mono text-aesop-clay mb-2 mt-6">· Agenda tu cita</p>
                <h3 className="font-serif italic text-[22px] text-aesop-soil mb-2">Selecciona fecha y horario</h3>
                <p className="text-body text-[14px] mb-6">Llamada exploratoria de 30 minutos.</p>

                <p className="label-mono text-aesop-clay mb-3">Día (Abril 2025)</p>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {days.map(d => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className="aspect-square flex items-center justify-center font-mono text-[13px] transition-colors duration-200 cursor-pointer"
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
                    <p className="label-mono text-aesop-clay mb-3">Horario</p>
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map(s => (
                        <button
                          type="button"
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
                  </>
                )}

                {selectedDay && selectedSlot && (
                  <p className="label-mono text-aesop-soil mt-6 text-center">
                    Cita seleccionada: {selectedDay} abril · {selectedSlot}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-cta w-full">Enviar y agendar cita</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
