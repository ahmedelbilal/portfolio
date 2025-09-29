import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Only allow "light" or "dark"
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Apply the selected theme to <html> and save it
  const applyTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  // On mount, load and apply stored theme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      applyTheme(stored ?? "light");
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

  // Icon based on theme
  const getIcon = () =>
    theme === "light" ? <Sun size={20} /> : <Moon size={20} />;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 cursor-target"
    >
      {getIcon()}
    </button>
  );
}
