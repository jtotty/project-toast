import React from "react";
import useKeydown from "../../hooks/useKeydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscape);

  function createToast(message, variant) {
    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]);
  }

  function dismissToast(id) {
    const index = toasts.findIndex((toast) => toast.id === id);

    if (index !== -1) {
      toasts.splice(index, 1);
      setToasts([...toasts]);
    }
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
