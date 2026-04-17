import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n/context';

export default function FloatingCTA() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { toast } = useToast();

  const onSubmit = () => {
    toast({
      title: t.floatingCta.successTitle,
      description: t.floatingCta.successMessage,
    });
    reset();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[80] btn-cta flex items-center gap-2 !px-4 !py-3 md:!px-8 md:!py-3"
      >
        <MessageSquare size={16} strokeWidth={1.5} />
        <span className="hidden md:inline">{t.floatingCta.buttonLabel}</span>
      </button>

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
              {t.floatingCta.title}
            </h3>
            <p className="text-body mb-8">{t.floatingCta.subtitle}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="label-mono text-aesop-clay block mb-2">{t.floatingCta.labels.name}</label>
                <input
                  {...register('name', { required: t.floatingCta.errors.nameRequired, maxLength: { value: 100, message: t.floatingCta.errors.nameMax } })}
                  className="aesop-input"
                  placeholder={t.floatingCta.placeholders.name}
                />
                {errors.name && <p className="text-[12px] mt-1" style={{ color: 'hsl(0, 62%, 50%)' }}>{String(errors.name.message)}</p>}
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">{t.floatingCta.labels.company}</label>
                <input
                  {...register('company', { maxLength: { value: 100, message: t.floatingCta.errors.nameMax } })}
                  className="aesop-input"
                  placeholder={t.floatingCta.placeholders.company}
                />
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">{t.floatingCta.labels.email}</label>
                <input
                  {...register('email', { required: t.floatingCta.errors.emailRequired, pattern: { value: /^\S+@\S+$/i, message: t.floatingCta.errors.emailInvalid } })}
                  type="email"
                  className="aesop-input"
                  placeholder={t.floatingCta.placeholders.email}
                />
                {errors.email && <p className="text-[12px] mt-1" style={{ color: 'hsl(0, 62%, 50%)' }}>{String(errors.email.message)}</p>}
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">{t.floatingCta.labels.serviceOfInterest}</label>
                <select {...register('service')} className="aesop-input">
                  <option value="">{t.floatingCta.selectPlaceholder}</option>
                  {t.floatingCta.serviceOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-mono text-aesop-clay block mb-2">{t.floatingCta.labels.message}</label>
                <textarea
                  {...register('message', { maxLength: { value: 1000, message: t.floatingCta.errors.messageMax } })}
                  className="aesop-input min-h-[100px] resize-none"
                  placeholder={t.floatingCta.placeholders.message}
                />
              </div>
              <button type="submit" className="btn-cta w-full">{t.floatingCta.submit}</button>
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
