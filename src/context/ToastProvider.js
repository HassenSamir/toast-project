import React, { createContext, useCallback, useEffect, useState } from "react";

export const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [isToastsShown, setIsToastsShown] = useState(false);

  const createToast = useCallback(
    (message, variant) => {
      const newToast = {
        id: crypto.randomUUID(),
        message: message,
        variant: variant,
      };
      const nextToasts = [...toasts, newToast];
      setToasts(nextToasts);
      setIsToastsShown(true);
    },
    [toasts]
  );

  const deleteToast = useCallback(
    (id) => {
      const nextToasts = [...toasts].filter((toast) => toast.id !== id);
      setToasts(nextToasts);
    },
    [toasts]
  );

  const deleteAllToasts = useCallback((event) => {
    if (event?.key === "Escape") {
      setToasts([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", deleteAllToasts);

    return () => {
      window.removeEventListener("keydown", deleteAllToasts);
    };
  }, []);

  const values = {
    toasts,
    isToastsShown,
    createToast,
    deleteToast,
  };

  return (
    <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
