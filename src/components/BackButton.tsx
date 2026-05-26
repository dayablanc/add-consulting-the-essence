import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center justify-center text-aesop-taupe hover:text-aesop-soil transition-colors duration-200 cursor-pointer"
      aria-label="Volver"
      title="Volver"
    >
      <ArrowLeft size={20} strokeWidth={1} />
    </button>
  );
}
