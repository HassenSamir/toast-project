import { useEffect } from "react";

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const handleEscapeEvent = (event) => {
      if (event?.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("keydown", handleEscapeEvent);

    return () => {
      window.removeEventListener("keydown", handleEscapeEvent);
    };
  }, [callback]);
};
