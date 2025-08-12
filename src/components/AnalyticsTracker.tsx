import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Envía un evento 'pageview' a Google Analytics cada vez que la ruta cambia
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null; // Este componente no renderiza nada en la UI
};

export default AnalyticsTracker;
