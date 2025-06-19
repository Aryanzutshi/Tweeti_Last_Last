// components/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { TailwindIndicator } from "./tailwind-indicator";
import { ThemeToggle } from "./theme-toggle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SessionProvider>
        {children}
        <ThemeToggle />
        <TailwindIndicator />
      </SessionProvider>
    </ThemeProvider>
  );
}
