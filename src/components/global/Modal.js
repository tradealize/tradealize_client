import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import useTranslations from "../../hooks/useTranslations";

const Modal = () => {
  const {
    size,
    title,
    content,
    hideHeader,
    clearModal,
    showModal,
    component,
    children,
    onCancel,
    callback,
  } = useContext(ModalContext);

  const translations = useTranslations();

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
    }
    clearModal();
  };

  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      role="dialog"
      data-bs-backdrop="static"
      aria-labelledby="modal"
      aria-hidden={!showModal}
    >
      <div
        className={`modal-dialog ${
          size && size !== null ? `modal-${size}` : ""
        }`}
        role="document"
      >
        <div className="modal-content">
          <button
            type="button"
            className="btn position-absolute text-muted mt-3 me-3 end-0 top-0
            d-flex align-items-center justify-content-center"
            data-bs-dismiss="modal"
            onClick={handleCancel}
            style={{ width: "30px", height: "30px" }}
          >
            <i className="fa fa-times"></i>
          </button>

          {title && !hideHeader && (
            <div className="modal-header pb-0 border-0">
              <h5 className="modal-title">{title}</h5>
            </div>
          )}

          <div className="modal-body">
            {content}
            {component}
            {children}
          </div>
          {(callback || onCancel) && (
            <div className="modal-footer">
              <div className="container-fluid px-0">
                <div className="row align-items-center">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn text-muted w-100"
                      data-dismiss="modal"
                      onClick={handleCancel}
                    >
                      {translations.general.cancel}
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={callback}
                    >
                      {translations.general.confirm}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
