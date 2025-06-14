"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      style={
        {
          "--normal-bg": "#18181B",
          "--normal-border": "#71717A",
          "--normal-text": "white",
        } as React.CSSProperties
      }
      position="top-center"
      {...props}
    />
  );
};

export { Toaster };
