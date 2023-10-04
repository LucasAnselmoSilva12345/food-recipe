interface WarningProps {
  message: string;
}

export function Warning({ message }: WarningProps) {
  return (
    <p className="mt-20 text-base font-inter font-normal text-center text-orange-400">
      {message}
    </p>
  );
}
