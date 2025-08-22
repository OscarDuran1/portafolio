import React, { useState, Suspense, useCallback } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import AnalyticsTracker from "../components/AnalyticsTracker";
import Logo from "../components/Logo";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const getNavLinkClass = useCallback(({ isActive }: { isActive: boolean }) => {
    const baseClasses =
      "relative py-1 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-cyan-400 after:transition-transform after:duration-300 after:origin-center";
    const activeClasses = "text-cyan-400 after:scale-x-100";
    const inactiveClasses =
      "text-white hover:text-cyan-400 after:scale-x-0 hover:after:scale-x-100";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  }, []);

  return (
    <>
      <AnalyticsTracker />
      <div className="min-h-screen bg-zinc-900 text-zinc-100 font-sans flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-sm sticky top-0 z-20 border-b border-zinc-700">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* Izquierda: Logo */}
            <div className="flex-1 md:flex-none">
              <NavLink to="/" className="hover:opacity-80 transition-opacity" aria-label="Página de inicio">
                <Logo />
              </NavLink>
            </div>

            {/* Centro: Navegación Desktop */}
            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex items-center space-x-8">
                <li>
                  <NavLink to="/" className={getNavLinkClass} end>
                    {t("nav.gallery")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={getNavLinkClass}>
                    {t("nav.about")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={getNavLinkClass}>
                    {t("nav.contact")}
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Derecha: Switcher de idioma y Menú Móvil */}
            <div className="flex-1 md:flex-none flex justify-end items-center">
              {/* Switcher de Idioma Desktop */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              {/* Botón Menú Móvil */}
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
            </div>
          </nav>
          {/* Mobile Menu Panel */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden bg-zinc-800/90 backdrop-blur-sm absolute w-full z-10"
              >
                <ul className="flex flex-col items-center space-y-6 py-8">
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => `text-lg transition-colors ${isActive ? "text-cyan-500" : "hover:text-cyan-400"}`}
                      end
                    >
                      {t("nav.gallery")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => `text-lg transition-colors ${isActive ? "text-cyan-500" : "hover:text-cyan-400"}`}
                    >
                      {t("nav.about")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) => `text-lg transition-colors ${isActive ? "text-cyan-500" : "hover:text-cyan-400"}`}
                    >
                      {t("nav.contact")}
                    </NavLink>
                  </li>
                  <li className="pt-4">
                    <LanguageSwitcher />
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* El contenido de cada página se renderizará aquí */}
        <main className="flex-grow relative">
          <AnimatePresence initial={false}>
            <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}>
              {/* Suspense muestra un fallback (ej. un spinner) mientras se carga el código de la página hija */}
              <Suspense fallback={<div className="flex justify-center items-center h-screen">Cargando...</div>}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-auto">
          <div className="container mx-auto px-6 py-4 text-center text-zinc-300">
            <p>
              &copy; {new Date().getFullYear()} Oscar Durán. {t("footer.rights")}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
