import { useState } from 'react';

interface ReadMoreButtonProps {
  text: string;
  maxLength: number;
}

export function ReadMoreButton({ text, maxLength }: ReadMoreButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const textShowed = expanded ? text : text.slice(0, maxLength);

  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <div>
      <p>{textShowed}</p>
      {text.length > maxLength && (
        <button
          onClick={handleClick}
          className="w-full mt-5 p-2 rounded text-base font-semibold text-slate-400 bg-slate-200 transition-all duration-150 hover:opacity-70 focus:outline-1 focus:outline-slate-600"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
}
