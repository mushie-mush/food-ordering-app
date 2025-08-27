import { ReactNode } from 'react';

interface IButton {
  children: ReactNode;
  variant?: string;
  isLoading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const baseStyle =
  'inline-flex items-center justify-center rounded-md min-w-[42px] min-h-[42px] px-4 py-2 shadow-sm text-sm cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-50';

const variantStyles: Record<string, string> = {
  primary: 'border border-slate-800 bg-slate-900 text-white hover:bg-slate-700',
  secondary: 'border border-slate-200 bg-white text-black hover:bg-gray-50',
  danger: 'border border-rose-700 bg-rose-600 text-white hover:bg-rose-500',
  icon: 'p-2 border border-slate-200 bg-white text-black hover:bg-gray-50',
};

function Button({ children, variant = 'primary', ...props }: IButton) {
  const classnames = [baseStyle, variantStyles[variant]].join(' ');

  return (
    <button className={classnames} {...props}>
      {children}
    </button>
  );
}
export default Button;
