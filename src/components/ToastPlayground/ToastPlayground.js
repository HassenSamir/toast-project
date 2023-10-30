import React, { useCallback, useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";

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
  const [message, setMessage] = useState();
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0].value);

  const handleMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <div className={styles.controlsWrapper}>
        <Message value={message} handleOnChange={handleMessage} />

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map(({ id, value }) => {
              return (
                <label htmlFor={id}>
                  <input
                    key={id}
                    id={id}
                    type='radio'
                    name='variant'
                    value={value}
                    checked={value === variant}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {value}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({ value, handleOnChange }) {
  return (
    <div className={styles.row}>
      <label
        htmlFor='message'
        className={styles.label}
        value={value}
        onChange={handleOnChange}
        style={{ alignSelf: "baseline" }}
      >
        Message
      </label>
      <div className={styles.inputWrapper}>
        <textarea id='message' className={styles.messageInput} />
      </div>
    </div>
  );
}

export default ToastPlayground;
