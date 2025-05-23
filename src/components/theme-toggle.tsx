import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react"; // Add an icon for system theme

export default function ThemeToggle() {
  // 1. Initialize state to "system" — no window/localStorage access during SSR
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // 2. Helper to apply theme to document and persist
  const applyTheme = (newTheme: typeof theme) => {
    setTheme(newTheme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (newTheme === "dark" || (newTheme === "system" && isSystemDark)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // 3. On mount: read stored theme (if any) and apply it
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as typeof theme | null;
      applyTheme(stored ?? "system");

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        if (theme === "system") {
          applyTheme("system");
        }
      };
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    // We intentionally only want this to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 4. Toggle order: light → dark → system → light …
  const toggleTheme = () => {
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    applyTheme(next);
  };

  // 5. Icon by theme
  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={16} className="animate-pulse" />;
      case "dark":
        return <Moon size={16} className="animate-bounce-subtle" />;
      case "system":
      default:
        return <Monitor size={16} className="animate-spin-slow" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105
                 bg-gray-200 hover:bg-gray-300 dark:bg-white/20 dark:hover:bg-white/30 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      {getIcon()}
      <span className="capitalize">{theme}</span>
    </button>
  );
}
