import React from "react";
import { useTranslation } from "react-i18next";
import { useSEO } from "../hooks/useSEO";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  useSEO({
    titleKey: "about.seo_title",
    descriptionKey: "about.seo_description"
  });

  return (
    <div className="container mx-auto px-6 py-16 animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 tracking-tight text-text-main">
        {t("about.title")}
      </h1>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 glass p-10 rounded-2xl shadow-2xl transition-all duration-300">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img
            src="img/perfil.webp"
            alt="Oscar Durán"
            className="relative w-160 h-64 rounded-xl object-cover shadow-xl flex-shrink-0 border-2 border-accent/20"
          />
        </div>
        <div className="text-lg text-text-main leading-relaxed text-center md:text-left opacity-90">
          <p className="mb-6 font-light">{t("about.p1")}</p>
          <p className="mb-6 font-light">{t("about.p2")}</p>
          <p className="font-light">{t("about.p3")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
