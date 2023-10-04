import { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Title({ title, className }: ComponentPropsWithRef<'h1'>) {
  return (
    <h1 className={twMerge('text-4xl font-semibold text-amber-700', className)}>
      {title}
    </h1>
  );
}
