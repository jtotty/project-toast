import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

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

  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
