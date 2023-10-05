import { twMerge } from 'tailwind-merge';

interface ClickableButtonProps {
  src: string;
  title: string;
  className?: string;
}

export function ClickableButton({
  src,
  title,
  className,
}: ClickableButtonProps) {
  return (
    <a
      className={twMerge(
        'w-full p-2 rounded text-lg font-bold flex items-center justify-center gap-1 text-orange-50 hover:opacity-80',
        className
      )}
      href={src}
    >
      {title}
    </a>
  );
}
