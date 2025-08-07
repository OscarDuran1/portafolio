import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLinkStyle = {
    color: "rgb(16 182 212)",
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      position: "absolute",
      width: "100%",
    },
    in: {
      opacity: 1,
      position: "relative",
    },
    out: {
      opacity: 0,
      position: "absolute",
      width: "100%",
    },
  };

  const pageTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4,
  };

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
            Oscar Durán
          </NavLink>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center space-x-6">
              <li>
                <NavLink to="/" className="hover:text-cyan-400 transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                  {t("nav.gallery")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-cyan-400 transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                  {t("nav.about")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-cyan-400 transition-colors" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>
                  {t("nav.contact")}
                </NavLink>
              </li>
            </ul>
            <LanguageSwitcher />
          </div>
        </nav>
        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden bg-gray-800/90 backdrop-blur-sm absolute w-full z-10">
              <ul className="flex flex-col items-center space-y-6 py-8">
                <li><NavLink to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 transition-colors text-lg" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>{t("nav.gallery")}</NavLink></li>
                <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 transition-colors text-lg" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>{t("nav.about")}</NavLink></li>
                <li><NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400 transition-colors text-lg" style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}>{t("nav.contact")}</NavLink></li>
                <li className="pt-4"><LanguageSwitcher /></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* El contenido de cada página se renderizará aquí */}
      <main className="flex-grow relative">
        <AnimatePresence initial={false}>
          <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-auto">
        <div className="container mx-auto px-6 py-4 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Oscar Durán. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
