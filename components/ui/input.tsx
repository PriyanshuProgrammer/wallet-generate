import React from "react";
export function Input({
  type = "text",
  placeholder = "",
  className = "",
  ref = null,
}: {
  type?: string;
  placeholder?: string;
  className?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}) {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`bg-transparent border-1 border-zinc-600 p-3 hover:bg-zinc-800 rounded-lg text-white ${className}`}
    />
  );
}
