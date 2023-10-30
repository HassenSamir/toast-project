import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../../context/ToastProvider";

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
  const { toasts, isToastsShown, createToast, deleteToast } =
    useContext(ToastContext);

  const handleMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createToast(message, variant);
      setVariant(VARIANT_OPTIONS[0].value);
      setMessage("");
    },
    [message, variant, createToast]
  );

  const handleDismiss = useCallback(
    (id) => {
      deleteToast(id);
    },
    [deleteToast]
  );

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>
      <form onSubmit={handleSubmit}>
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
              <Button type='submit'>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>

      {isToastsShown && (
        <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />
      )}
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
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

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
          ref={textareaRef}
          id='message'
          className={styles.messageInput}
          value={value}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default ToastPlayground;
