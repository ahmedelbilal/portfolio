import { useI18next } from "gatsby-plugin-react-i18next";
import React from "react";

const LanguageSwitcher: React.FC = () => {
  const { languages, language, changeLanguage } = useI18next();

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent cursor-pointer font-medium focus:outline-none"
      >
        {languages.map((lang) => (
          <option
            key={lang}
            value={lang}
            className="bg-white dark:bg-slate-800"
          >
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
