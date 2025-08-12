import { lazy } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Hacemos "lazy loading" de las páginas.
// Esto divide el código de cada página en su propio archivo (chunk),
// que solo se descarga cuando el usuario navega a esa página.
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Esto usará URLs con un # (ej. /portafolio/#/about) que funcionan
// sin necesidad de configuración especial en el servidor.
const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
