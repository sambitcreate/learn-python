"use client";

import React from "react";
import { useTheme, Theme } from "./ThemeProvider";
import { Moon, Sun, Monitor } from "lucide-react";

const options: { key: Theme; label: string; icon: React.ReactNode }[] = [
  { key: "light", label: "Light", icon: <Sun className="w-4 h-4" aria-hidden /> },
  { key: "dark", label: "Dark", icon: <Moon className="w-4 h-4" aria-hidden /> },
  { key: "system", label: "System", icon: <Monitor className="w-4 h-4" aria-hidden /> },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border p-1" role="group" aria-label="Theme">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => setTheme(opt.key)}
          aria-pressed={theme === opt.key}
          aria-label={`Set theme: ${opt.label}`}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
            theme === opt.key
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent/10"
          }`}
        >
          {opt.icon}
          <span className="sr-only">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
