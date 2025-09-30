import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const applyTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      applyTheme(stored ?? "light");
    }
  }, []);

  const toggleTheme = () => {
    applyTheme(theme === "light" ? "dark" : "light");
  };

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
