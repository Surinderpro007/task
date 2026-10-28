import { ALPHABETS } from '../config';

const LETTERS = ['All', ...ALPHABETS];

export default function AlphabetFilter({ active, onChange }) {
  return (
    <div
      className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-1"
      role="tablist"
      aria-label="Filter by first letter"
    >
      {LETTERS.map((letter) => {
        const isActive = active === letter;
        return (
          <button
            key={letter}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(letter)}
            className={`flex h-7 shrink-0 items-center justify-center rounded-full text-xs transition ${
              letter === 'All' ? 'px-3.5' : 'w-7'
            } ${
              isActive
                ? 'bg-primary font-medium text-white'
                : 'bg-mint/70 text-ink hover:bg-mint'
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}