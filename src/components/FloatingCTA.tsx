import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
      {/* Floating button — always visible on mobile, bottom right */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[80] btn-cta flex items-center gap-2 !px-4 !py-3 md:!px-8 md:!py-3"
      >
        <MessageSquare size={16} strokeWidth={1.5} />
        <span className="hidden md:inline">Consúltanos</span>
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

            <h3 className="font-serif text-[28px] font-light text-aesop-soil mb-2 mt-8" style={{ fontStyle: 'italic' }}>
              Consúltanos
            </h3>
            <p className="text-body mb-8">Déjanos tus datos y te contactamos en menos de 24 horas.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Nombre</label>
                <input
                  {...register('name', { required: 'El nombre es obligatorio', maxLength: { value: 100, message: 'Máximo 100 caracteres' } })}
                  className="aesop-input"
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="text-[12px] text-red-600 mt-1">{String(errors.name.message)}</p>}
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Empresa</label>
                <input
                  {...register('company', { maxLength: { value: 100, message: 'Máximo 100 caracteres' } })}
                  className="aesop-input"
                  placeholder="Nombre de tu empresa"
                />
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Correo electrónico</label>
                <input
                  {...register('email', { required: 'El correo es obligatorio', pattern: { value: /^\S+@\S+$/i, message: 'Correo inválido' } })}
                  type="email"
                  className="aesop-input"
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && <p className="text-[12px] text-red-600 mt-1">{String(errors.email.message)}</p>}
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Servicio de interés</label>
                <select {...register('service')} className="aesop-input">
                  <option value="">Seleccionar...</option>
                  <option value="strategic-partner">Strategic Partner (HRBP)</option>
                  <option value="essentials">Corporative Essentials</option>
                  <option value="reclutamiento">Reclutamiento</option>
                  <option value="auditoria">Auditoría y Cumplimiento</option>
                  <option value="grow">ADD Grow</option>
                  <option value="first-step">ADD First Step</option>
                  <option value="simulaciones">Simulaciones</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">Mensaje</label>
                <textarea
                  {...register('message', { maxLength: { value: 1000, message: 'Máximo 1000 caracteres' } })}
                  className="aesop-input min-h-[100px] resize-none"
                  placeholder="¿Cómo podemos ayudarte?"
                />
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
