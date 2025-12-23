interface DotProps {
  selected: boolean;
  onClick: () => void;
}

export default function Dot({ selected, onClick }: DotProps) {
  return (
    <button
      className={`embla__dot h-3 w-3 cursor-pointer rounded-full bg-pearl-bush transition-colors duration-300 ease-in-out ${selected ? 'is-selected bg-shark' : ''}`}
      type="button"
      onClick={onClick}
    />
  );
}
