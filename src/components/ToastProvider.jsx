"use client"

import { ToastContainer } from "react-toastify";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        theme="dark"
        autoClose={5000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ToastProvider;
