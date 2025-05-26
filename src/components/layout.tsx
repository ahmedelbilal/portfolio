import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import LanguageSwitcher from "./language-switcher";
import ThemeToggle from "./theme-toggle";
import { AOSInit } from "./aos";

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
      className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4 sm:p-10 font-sans"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <AOSInit />
      {/* Navigation */}
      <header className="sticky max-w-6xl mx-auto rounded-full top-0 z-50 bg-white dark:bg-gray-900 shadow">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  width={40}
                  height={40}
                  alt="ahmedcodes"
                />
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hidden sm:block">
                  {/* {t("ahmed")} {t("codes")} */}
                  ahmedcodes
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["projects", "skills", "contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className="font-medium text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {t(item)}
                </Link>
              ))}
            </div>

            {/* Right Controls: Language Select + Theme Toggle */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Theme Toggle */}
              <div className="hidden md:block">
                {/* Your theme toggle component */}
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-4 py-3 space-y-4">
              {["projects", "skills", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block font-medium text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item)}
                </a>
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
