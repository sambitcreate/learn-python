"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isBrowser } from "@/lib/storage";

export type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "theme"; // will be prefixed by storage util in inline script; here we keep simple

function getSystemPrefersDark() {
  if (!isBrowser) return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyThemeClass(theme: Theme) {
  if (!isBrowser) return;
  const root = document.documentElement;
  const dark = theme === "dark" || (theme === "system" && getSystemPrefersDark());
  root.classList.toggle("dark", dark);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    if (!isBrowser) return;
    try {
      const saved = localStorage.getItem("learnpy::" + STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        setThemeState(saved);
        applyThemeClass(saved);
      } else {
        // initialize based on system
        applyThemeClass("system");
      }
    } catch {
      // ignore
    }

    // listen to system changes if on system theme
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") applyThemeClass("system");
    };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("learnpy::" + STORAGE_KEY, t);
    } catch {}
    applyThemeClass(t);
  };

  const isDark = useMemo(() => {
    return theme === "dark" || (theme === "system" && getSystemPrefersDark());
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme, isDark }), [theme, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

