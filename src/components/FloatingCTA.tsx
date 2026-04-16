import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  const onSubmit = () => {
    toast({
      title: '¡Listo!',
      description: 'Te contactaremos en menos de 24 horas.',
    });
    reset();
    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-[80] btn-cta flex items-center gap-2"
      >
        <span className="hidden md:inline">Consúltanos</span>
        <MessageSquare size={16} strokeWidth={1} className="md:hidden" />
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-[90]">
          <div className="absolute inset-0 bg-aesop-soil/50" onClick={() => setOpen(false)} />
          <div
            className="absolute top-0 right-0 bottom-0 w-full max-w-[420px] bg-aesop-parchment p-8 lg:p-12 overflow-y-auto"
            style={{ animation: 'slideInRight 300ms ease forwards' }}
          >
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-aesop-taupe hover:text-aesop-soil transition-colors duration-200">
              <X size={18} strokeWidth={1} />
            </button>

            <h3 className="font-serif italic text-[32px] font-light text-aesop-soil mb-2 mt-8">
              Consúltanos
            </h3>
            <p className="text-body mb-8">Déjanos tus datos y te contactamos en menos de 24 horas.</p>

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
                <textarea {...register('message')} className="aesop-input min-h-[100px] resize-none" placeholder="¿Cómo podemos ayudarte?" />
              </div>
              <button type="submit" className="btn-cta w-full">Enviar consulta</button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
