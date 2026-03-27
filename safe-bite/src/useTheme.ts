import { useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "safe-bite-theme";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;

  const prefersDark =
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? true;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => "dark");

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const api = useMemo(() => {
    const set = (t: Theme) => {
      setTheme(t);
      localStorage.setItem(STORAGE_KEY, t);
      applyTheme(t);
    };

    const toggle = () => set(theme === "dark" ? "light" : "dark");

    return { theme, set, toggle };
  }, [theme]);

  return api;
}

