import { motion, type Variants } from "framer-motion";
import type { Photo } from "../data/photos";
import { useTranslation } from "react-i18next";

interface ModalProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: {
    y: "-50px",
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    y: "0",
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    y: "50px",
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const Modal = ({ photo, onClose, onNext, onPrevious }: ModalProps) => {
  const { t } = useTranslation();
  // Detiene la propagación para evitar que el clic en la imagen o botones cierre el modal
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Botón de Cierre (Esquina superior derecha) */}
      <button
        onClick={(e) => {
          stopPropagation(e);
          onClose();
        }}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[52] focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-full"
        aria-label="Cerrar modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Botón Anterior */}
      <button
        onClick={(e) => {
          stopPropagation(e);
          onPrevious();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 bg-black/20 rounded-full p-2 hover:bg-black/40 hover:text-white transition-all z-[51] focus:outline-none focus:ring-2 focus:ring-cyan-500"
        aria-label="Foto anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Contenedor de la Imagen */}
      <motion.div
        className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] flex flex-col items-center"
        onClick={stopPropagation}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <img src={photo.src} alt={t(photo.title)} className="max-w-full max-h-[calc(90vh-80px)] object-contain rounded-lg shadow-2xl" />
        <h2 id="modal-title" className="text-center text-white mt-4 text-xl font-bold">
          {t(photo.title)}
        </h2>
      </motion.div>

      {/* Botón Siguiente */}
      <button
        onClick={(e) => {
          stopPropagation(e);
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 bg-black/20 rounded-full p-2 hover:bg-black/40 hover:text-white transition-all z-[51] focus:outline-none focus:ring-2 focus:ring-cyan-500"
        aria-label="Siguiente foto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
};

export default Modal;
