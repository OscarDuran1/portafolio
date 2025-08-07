import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const MainLayout: React.FC = () => {
  const location = useLocation();
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
          <div className="flex items-center gap-8">
            <ul className="flex space-x-6">
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
