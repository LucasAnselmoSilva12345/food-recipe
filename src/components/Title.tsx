import { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Title({ title, className }: ComponentPropsWithRef<'h1'>) {
  return (
    <h1
      className={twMerge(
        'text-4xl pt-4 font-bold font-inter text-orange-600',
        className
      )}
    >
      {title}
    </h1>
  );
}
