import { useI18next } from "gatsby-plugin-react-i18next";
import React from "react";

const LanguageSwitcher: React.FC = () => {
  const { languages, language, changeLanguage } = useI18next();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-transparent cursor-pointer font-medium focus:outline-none"
    >
      {languages.map((lang) => (
        <option
          key={lang}
          value={lang}
          className="bg-white dark:bg-slate-800 cursor-target"
        >
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
