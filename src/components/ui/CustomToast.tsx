import { X } from 'lucide-react';
import { Toast as SonnerToast, toast } from 'sonner';
import { cn } from "../../lib/utils";

type Variant = 'success' | 'error';

interface Props {
  id: number;
  title: string;
  description?: string;
  variant?: Variant;
}

export const CustomToast = ({ id, title, description, variant = 'success' }: Props) => (
  <SonnerToast.Root
    id={id}
    duration={3_000}
    className={cn(
      'relative flex w-[480px] items-start gap-4 rounded-xl p-6',
      'shadow-[0_8px_32px_rgba(0,0,0,0.55)]',
      'bg-[#1E242C] text-white'
    )}
  >
    {/* icon bubble */}
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full',
        variant === 'success' ? 'bg-emerald-600/25' : 'bg-red-600/25'
      )}
    >
      {variant === 'success' ? (
        <svg width="16" height="16" className="text-emerald-400">
          <path fill="currentColor" d="M6.5 11 3 7.5l1.4-1.4 2.1 2.1L11.6 3 13 4.4 6.5 11Z" />
        </svg>
      ) : (
        <X size={16} className="text-red-400" />
      )}
    </div>

    {/* text */}
    <div className="flex flex-col">
      <strong className="text-[20px] font-semibold leading-tight">{title}</strong>
      {description && (
        <span className="mt-[2px] text-[16px] leading-snug text-gray-400">{description}</span>
      )}
    </div>

    {/* close */}
    <button
      onClick={() => toast.dismiss(id)}
      className="absolute right-4 top-4 text-gray-400 hover:text-white"
    >
      <X size={18} />
    </button>

    {/* progress bar */}
    <span
      className={cn(
        'absolute bottom-0 left-0 h-[4px] rounded-b-xl',
        variant === 'success' ? 'bg-emerald-500' : 'bg-red-500',
        'inline-block animate-fill'
      )}
      style={{ animationDuration: '3000ms' }}
    />
  </SonnerToast.Root>
);