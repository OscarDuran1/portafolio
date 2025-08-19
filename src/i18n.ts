import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: '/portafolio/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: true,
    },
});

export default i18n;
