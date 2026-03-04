import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SEOProps {
    titleKey: string;
    descriptionKey: string;
}

export const useSEO = ({ titleKey, descriptionKey }: SEOProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        // Actualizar el título
        const baseTitle = "Oscar Durán";
        const pageTitle = t(titleKey);
        document.title = `${pageTitle} | ${baseTitle}`;

        // Actualizar la meta descripción
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", t(descriptionKey));
        }
    }, [t, titleKey, descriptionKey]);
};
