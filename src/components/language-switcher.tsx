import { useI18next } from "gatsby-plugin-react-i18next";
import React from "react";

const languagesFlags: { [key: string]: { name: string; flag: string } } = {
  ar: { name: "العربية", flag: "🇸🇦" },
  en: { name: "English", flag: "🇺🇸" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  it: { name: "Italiano", flag: "🇮🇹" },
};

const LanguageSwitcher: React.FC = () => {
  const { languages, language, changeLanguage } = useI18next();

  return (
    <div className="relative transition-opacity duration-500">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent font-medium cursor-pointer px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang} className="dark:">
            {languagesFlags[lang].flag} {languagesFlags[lang].name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
