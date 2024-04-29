import { useEffect } from "react";
import "./Toast.css";

type ToastProps = {
  message: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const Toast = ({ message, visible, setVisible }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, setVisible]);

  return <div className={`toast ${visible ? "show" : ""}`}>{message}</div>;
};
