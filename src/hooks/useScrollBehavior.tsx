import { useEffect } from "react";
import { Location } from "react-router-dom";

export const useScrollBehavior = (location: Location) => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      // Your initScrollbarBehavior function here
    };

    handleScroll();

    return () => {
      // Cleanup if needed
    };
  }, [location]);
};
