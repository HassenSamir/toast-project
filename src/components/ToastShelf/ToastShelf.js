import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts, handleDismiss }) {
  return (
    <ol
      className={styles.wrapper}
      role='list'
      aria-live='polite'
      aria-label='Toasts'
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            variant={toast.variant}
            content={toast.message}
            handleDismiss={() => handleDismiss(toast.id)}
          />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
