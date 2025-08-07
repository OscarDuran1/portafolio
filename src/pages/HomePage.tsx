import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { type Photo, photos } from "../data/photos";
import { categories } from "../data/categories";
import Modal from "../components/Modal";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { t } = useTranslation();

  const filteredPhotos = selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [selectedPhoto, filteredPhotos]);

  const handlePreviousPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [selectedPhoto, filteredPhotos]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (event.key === "Escape") handleCloseModal();
      if (event.key === "ArrowRight") handleNextPhoto();
      if (event.key === "ArrowLeft") handlePreviousPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, handleNextPhoto, handlePreviousPhoto]);

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">{t("home.title")}</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{t("home.subtitle")}</p>
      </div>

      {/* Photo Gallery Section */}
      <section id="gallery" className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">{t("home.gallery_title")}</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md text-white transition-colors duration-300 ${selectedCategory === category.id ? "bg-cyan-500" : "bg-gray-700 hover:bg-cyan-600"}`}
            >
              {t(category.name)}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 grid-flow-dense">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <PhotoThumbnail key={photo.id} photo={photo} onClick={handlePhotoClick} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>{selectedPhoto && <Modal photo={selectedPhoto} onClose={handleCloseModal} onNext={handleNextPhoto} onPrevious={handlePreviousPhoto} />}</AnimatePresence>
    </>
  );
};

export default HomePage;
