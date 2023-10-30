import React, { useCallback, useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import Toast from "../Toast/Toast";

const VARIANT_OPTIONS = [
  {
    id: crypto.randomUUID(),
    value: "notice",
  },
  {
    id: crypto.randomUUID(),
    value: "warning",
  },
  {
    id: crypto.randomUUID(),
    value: "success",
  },
  {
    id: crypto.randomUUID(),
    value: "error",
  },
];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0].value);
  const [showToast, setShowToast] = useState(false);

  const handleMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleButtonClick = useCallback(() => {
    setShowToast(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      {showToast && (
        <Toast
          variant={variant}
          content={message}
          handleDismiss={handleDismiss}
        />
      )}
      <div className={styles.controlsWrapper}>
        <Message value={message} handleOnChange={handleMessage} />

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map(({ id, value }) => (
              <RadioButtonWithLabel
                key={id}
                id={id}
                name='variant'
                value={value}
                checked={value === variant}
                onChange={(e) => setVariant(e.target.value)}
              />
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={handleButtonClick}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioButtonWithLabel({ id, name, value, checked, onChange }) {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {value}
    </label>
  );
}

function Message({ value, handleOnChange }) {
  return (
    <div className={styles.row}>
      <label
        htmlFor='message'
        className={styles.label}
        value={value}
        style={{ alignSelf: "baseline" }}
      >
        Message
      </label>
      <div className={styles.inputWrapper}>
        <textarea
          id='message'
          className={styles.messageInput}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default ToastPlayground;
