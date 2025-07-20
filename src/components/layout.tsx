import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4 sm:p-10 font-sans"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Navigation */}
      <header className="sticky max-w-6xl mx-auto rounded-3xl shadow-xl top-0 z-50 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            {/* Logo (stays on the left) */}
            <div className="flex items-center">
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

            {/* Everything else: Menu + Controls */}
            <div className="flex items-center gap-8">
              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-8">
                {["projects", "skills", "contact"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item}`}
                    className={`font-medium py-2 px-4 rounded-3xl hover:text-white hover:bg-blue-500 transition-colors ${
                      location.pathname.includes(item) &&
                      "bg-blue-500 text-white"
                    }`}
                  >
                    {t(item)}
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

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 shadow-xl rounded-3xl">
            <div className="px-4 py-3 space-y-4">
              {["projects", "skills", "contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className={`block font-medium py-2 px-4 rounded-full hover:text-white hover:bg-blue-500 transition-colors ${
                    location.pathname.includes(item) && "bg-blue-500 text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item)}
                </Link>
              ))}
              <div className="flex items-center justify-between py-2">
                {/* Mobile Language Selector */}
                <LanguageSwitcher />

                {/* Mobile Theme Toggle */}
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
