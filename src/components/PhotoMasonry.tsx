import React from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import PhotoThumbnail from "./PhotoThumbnail";
import { type Photo } from "../data/photos";

interface PhotoMasonryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

// Define los puntos de quiebre para el número de columnas
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const PhotoMasonry: React.FC<PhotoMasonryProps> = ({ photos, onPhotoClick }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto -ml-4" // Usa flexbox y un margen negativo para el espaciado
      columnClassName="pl-4 bg-clip-padding" // Padding en cada columna para crear el "gap"
    >
      {photos.map((photo) => (
        <motion.div
          layout
          key={photo.id}
          className="mb-4" // Margen inferior para el espaciado vertical
        >
          <PhotoThumbnail photo={photo} onClick={onPhotoClick} />
        </motion.div>
      ))}
    </Masonry>
  );
};

export default PhotoMasonry;
