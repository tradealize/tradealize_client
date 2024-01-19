import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const ErrorAlert = () => {
  const { showAlert, alertContent, hideAlert } = useContext(ModalContext);
  return (
    <div
      className={`alert alert-danger alert-dismissible fixed-top ms-auto me-2 mt-1 fade-show ${
        !showAlert ? "hidden" : ""
      }`}
      role="alert"
      style={{ maxWidth: 500, zIndex: 2500 }}
    >
      {alertContent}
      <button className="btn-close" onClick={hideAlert}></button>
    </div>
  );
};

export default ErrorAlert;
