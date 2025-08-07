import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: "es", name: "ES" },
    { code: "en", name: "EN" },
  ];

  return (
    <div className="flex items-center space-x-2 bg-gray-700 rounded-full p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 text-sm font-bold rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            i18n.language.startsWith(lang.code) ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-gray-600"
          }`}
          aria-current={i18n.language.startsWith(lang.code) ? "page" : undefined}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
