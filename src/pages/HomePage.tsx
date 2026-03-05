import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { type Photo, photos } from "../data/photos";
import { categories } from "../data/categories";
import Modal from "../components/Modal";
import { useTranslation } from "react-i18next";
import PhotoMasonry from "../components/PhotoMasonry";
import { useSEO } from "../hooks/useSEO";

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { t } = useTranslation();

  useSEO({
    titleKey: "home.seo_title",
    descriptionKey: "home.seo_description"
  });

  const filteredPhotos =
    selectedCategory === "all"
      ? categories
        .filter((cat) => cat.id !== "all")
        .flatMap((cat) => photos.filter((p) => p.category === cat.id).slice(0, 5))
      : photos.filter((photo) => photo.category === selectedCategory);

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
      <div className="container mx-auto px-6 py-20 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main transition-colors duration-300">
          {t("home.title")}
        </h1>
      </div>

      {/* Photo Gallery Section */}
      <section id="gallery" className="container mx-auto px-6 py-12">
        <h2 className="text-4xl text-center mb-8">{t("home.gallery_title")}</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${selectedCategory === category.id
                ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                : "bg-transparent text-text-main border-zinc-500/30 hover:border-accent hover:text-accent"
                }`}
            >
              {t(category.name)}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <PhotoMasonry photos={filteredPhotos} onPhotoClick={handlePhotoClick} />
      </section>

      <AnimatePresence>{selectedPhoto && <Modal photo={selectedPhoto} onClose={handleCloseModal} onNext={handleNextPhoto} onPrevious={handlePreviousPhoto} />}</AnimatePresence>
    </>
  );
};

export default HomePage;
