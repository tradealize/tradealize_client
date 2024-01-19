import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const SuccessAlert = () => {
  const { showSuccess, successContent, clearSuccess } =
    useContext(ModalContext);

  return (
    <div
      className={`alert alert-success alert-dismissible fixed-top ms-auto me-2 fade-show mt-2 ${
        !showSuccess ? "hidden" : ""
      }`}
      role="alert"
      style={{ maxWidth: 500, zIndex: 2500 }}
    >
      {successContent}
      <button className="btn-close" onClick={clearSuccess}></button>
    </div>
  );
};

export default SuccessAlert;
