import React from "react";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-center mb-12">{t("about.title")}</h1>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-gray-800/50 p-8 rounded-lg">
        <img src="img/perfil.jpg" alt="Oscar Durán" className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg flex-shrink-0 border-4 border-gray-700" />
        <div className="text-lg text-gray-300 leading-relaxed text-center md:text-left">
          <p className="mb-6">{t("about.p1")}</p>
          <p className="mb-6">{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
