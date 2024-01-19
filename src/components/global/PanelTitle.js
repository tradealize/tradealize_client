import React from "react";
import useTranslations from "../../hooks/useTranslations";

const PanelTitle = ({ title, onClick, hideButton }) => {
  const translations = useTranslations();

  return (
    <div className="row mx-0 align-items-center mb-3 pb-3 border-bottom">
      <div className="col col-md-6 px-0">
        <h1 className="h2 bold mb-0">{title}</h1>
      </div>
      {!hideButton && (
        <div className="col col-md-6 px-0 text-end">
          <button className="btn btn-primary" onClick={onClick}>
            + {translations.admin.users.addBtn}
          </button>
        </div>
      )}
    </div>
  );
};

export default PanelTitle;
