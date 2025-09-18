import { cn } from "@/lib/utils";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { Menu, X } from "lucide-react";
import React from "react";
import usePathName from "../hooks/use-path-name";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  const { t, i18n } = useTranslation();
  const pathName = usePathName();

  return (
    <header className="sticky max-w-6xl mx-auto rounded-3xl shadow-xl top-0 z-50 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center cursor-target">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-blue-500 w-8 h-8 text-white rounded-full inline-flex items-center justify-center text-xs font-bold">
                {"<a/>"}
              </span>
              <span className="font-bold text-xl text-blue-500">
                Ahmed Elbilal
              </span>
              <sup className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </Link>
          </div>

          {/* Menu & Controls */}
          <div className="flex items-center gap-8">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {["projects", "skills", "contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className={cn(
                    "cursor-target font-medium py-2 px-4 rounded-3xl overflow-hidden z-10",
                    pathName.includes(item)
                      ? "bg-blue-500 text-white"
                      : "text-gray-900 dark:text-white"
                  )}
                >
                  <span className="relative z-10">{t(item)}</span>
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden relative">
              {/* Hidden Checkbox */}
              <input
                id="mobile-menu-toggle"
                type="checkbox"
                className="hidden peer"
              />

              {/* Menu Icon */}
              <label
                htmlFor="mobile-menu-toggle"
                className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Menu size={26} />
              </label>

              {/* Full-Screen Mobile Menu */}
              <div
                className="fixed inset-0 bg-white dark:bg-slate-900 z-50 
                             transform translate-x-full peer-checked:translate-x-0 
                             transition-transform duration-300 ease-in-out"
              >
                {/* Close Button */}
                <div className="absolute top-5 right-5">
                  <label
                    htmlFor="mobile-menu-toggle"
                    className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <X size={28} />
                  </label>
                </div>

                {/* Menu Content */}
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  {["projects", "skills", "contact"].map((item) => (
                    <Link
                      key={item}
                      to={`/${item}`}
                      className={`text-2xl font-semibold transition-colors duration-300 
                          ${
                            pathName.includes(item)
                              ? "text-blue-500"
                              : "text-gray-800 dark:text-white"
                          } hover:text-blue-500`}
                      onClick={() => {
                        // Close menu after clicking a link
                        const checkbox = document.getElementById(
                          "mobile-menu-toggle"
                        ) as HTMLInputElement;
                        if (checkbox) checkbox.checked = false;
                      }}
                    >
                      {t(item)}
                    </Link>
                  ))}

                  {/* Mobile Footer Controls */}
                  <div className="flex items-center gap-6 mt-8">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
