'use client';

// import {ButtonProps} from '@/lib/types';
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

export default function Button({
  label,
  onClick,
  disabled,
  outline,
  small
}: ButtonProps) {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? 'bg-white border-black text-black'
          : ' bg-rose-500 border-rose-500 text-white'
      } ${
        small
          ? 'py-1 text-sm font-light border-[1px]'
          : 'py-3 text-md font-semibold border-2'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
