import { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  serviceName?: string;
}

const sizes = ['1–5', '6–20', '21–80', '+80', 'Soy candidato'];
const needs = ['RR.HH.', 'Legal', 'Reclutamiento', 'Carrera', 'Otro'];
const urgencies = ['Esta semana', 'Este mes', '1–3 meses', 'Solo explorando'];

export default function QuoteModal({ open, onClose, serviceName }: QuoteModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [selectedUrgency, setSelectedUrgency] = useState('');

  if (!open) return null;

  const onSubmit = () => {
    toast({
      title: '¡Listo!',
      description: 'Te contactaremos en menos de 24 horas con una propuesta personalizada.',
    });
    reset();
    setSelectedSize('');
    setSelectedNeeds([]);
    setSelectedUrgency('');
    onClose();
  };

  const toggleNeed = (n: string) => {
    setSelectedNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(42,37,32,0.88)', backdropFilter: 'blur(6px)' }} />
      <div
        className="relative bg-aesop-parchment w-full max-w-[560px] mx-4 p-10 lg:p-14 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-aesop-taupe hover:text-aesop-soil transition-colors duration-200">
          <X size={18} strokeWidth={1} />
        </button>

        <h3 className="font-serif italic text-[32px] font-light text-aesop-soil mb-2">
          Cuéntanos sobre tu situación
        </h3>
        {serviceName && (
          <p className="eyebrow-mono mb-8">Servicio: {serviceName}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label-mono text-aesop-clay block mb-2">Nombre completo</label>
            <input {...register('name')} className="aesop-input" placeholder="Tu nombre" required />
          </div>
          <div>
            <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
            <input {...register('email')} type="email" className="aesop-input" placeholder="correo@ejemplo.com" required />
          </div>
          <div>
            <label className="label-mono text-aesop-clay block mb-2">Empresa (opcional)</label>
            <input {...register('company')} className="aesop-input" placeholder="Nombre de tu empresa" />
          </div>

          <div>
            <label className="label-mono text-aesop-clay block mb-3">Tamaño / Situación</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className="px-4 py-2 font-sans text-[13px] border transition-colors duration-200"
                  style={{
                    borderColor: selectedSize === s ? 'hsl(24,33%,46%)' : 'hsl(30,14%,72%)',
                    background: selectedSize === s ? 'hsl(24,33%,85%)' : 'transparent',
                    color: 'hsl(20,10%,15%)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-mono text-aesop-clay block mb-3">Necesidad principal</label>
            <div className="flex flex-wrap gap-2">
              {needs.map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => toggleNeed(n)}
                  className="px-4 py-2 font-sans text-[13px] border transition-colors duration-200"
                  style={{
                    borderColor: selectedNeeds.includes(n) ? 'hsl(24,33%,46%)' : 'hsl(30,14%,72%)',
                    background: selectedNeeds.includes(n) ? 'hsl(24,33%,85%)' : 'transparent',
                    color: 'hsl(20,10%,15%)',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-mono text-aesop-clay block mb-3">Urgencia</label>
            <div className="flex flex-wrap gap-2">
              {urgencies.map(u => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setSelectedUrgency(u)}
                  className="px-4 py-2 font-sans text-[13px] border transition-colors duration-200"
                  style={{
                    borderColor: selectedUrgency === u ? 'hsl(24,33%,46%)' : 'hsl(30,14%,72%)',
                    background: selectedUrgency === u ? 'hsl(24,33%,85%)' : 'transparent',
                    color: 'hsl(20,10%,15%)',
                  }}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-cta w-full mt-4">
            Enviar consulta
          </button>
        </form>
      </div>
    </div>
  );
}
