import type { Photo } from "../data/photos";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PhotoThumbnailProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoThumbnail = ({ photo, onClick }: PhotoThumbnailProps) => {
  const { t } = useTranslation();
  const getSpan = () => {
    const ratio = photo.width / photo.height;

    // Imagen panorámica (muy ancha), ocupa 2 columnas
    if (ratio > 1.8) {
      return "md:col-span-2";
    }

    // Imagen de retrato (alta), ocupa 2 filas
    if (ratio < 0.8) {
      return "md:row-span-2";
    }

    // Las imágenes cuadradas y de paisaje estándar ocuparán 1x1 por defecto
    return "";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${getSpan()} group relative cursor-pointer overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900`}
      onClick={() => onClick(photo)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(photo)}
      tabIndex={0}
      role="button"
      aria-label={`Ver foto: ${t(photo.title)}`}
    >
      <img src={photo.src} alt={t(photo.title)} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{t(photo.title)}</p>
      </div>
    </motion.div>
  );
};

export default PhotoThumbnail;
