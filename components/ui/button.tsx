export function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={`bg-transparent border-1 border-zinc-600 p-3 hover:bg-zinc-800 hover:cursor-pointer rounded-lg text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
