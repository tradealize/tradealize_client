import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { findUserData } from "../../utils/tesseract";

const UploadUserIdentity = ({
  user,
  readID,
  setUserData,
  saveAction,
  handleCancel,
}) => {
  const [text, setText] = useState("");
  const [backID, setBackID] = useState(null);
  const [frontID, setFrontID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedID, setSavedID] = useState(false);
  const [backImagePath, setBackImagePath] = useState(null);
  const [frontImagePath, setFrontImagePath] = useState(null);

  const getObjectUrl = (object) => URL.createObjectURL(object);

  const isDisabled = frontImagePath === null || backImagePath === null;

  useEffect(() => {
    if (text !== "" && typeof text === "string" && readID) {
      let user_data = findUserData(text);
      user_data = { ...user, ...user_data };
      setUserData(user_data);
    }
  }, [text]);

  const handleClick = () => {
    if (readID) {
      setLoading(true);
      Tesseract.recognize(frontImagePath, "spa")
        .catch((err) => {
          console.error(err);
          setLoading(false);
        })
        .then((result) => {
          setSavedID(true);
          setLoading(false);
          setText(result.data.text);
        });
    } else {
      saveAction(frontID, backID);
    }
  };

  const handleFrontChange = (e) => {
    const image = e.target.files[0];
    const urlPath = getObjectUrl(image);
    setFrontImagePath(urlPath);
    setFrontID(image);
  };

  const handleBackChange = (e) => {
    const image = e.target.files[0];
    const urlPath = getObjectUrl(image);
    setBackImagePath(urlPath);
    setBackID(image);
  };

  const renderFrontImage = () => {
    if (frontImagePath !== null) {
      return (
        <img
          src={frontImagePath}
          className="mw-100 w-100 my-3 mx-auto d-block"
        />
      );
    }
  };

  const renderBackImage = () => {
    if (backImagePath !== null) {
      return (
        <img
          src={backImagePath}
          className="mw-100 w-100 my-3 mx-auto d-block"
        />
      );
    }
  };

  const renderCancel = () => {
    if (typeof handleCancel === "function") {
      return (
        <button
          className="btn btn-outline-secondary w-100 my-3"
          onClick={handleCancel}
        >
          Cancel
        </button>
      );
    }
  };
  return (
    <div>
      <div className="card p-3 shadow-sm mt-4">
        <h3 className="bold">
          Toma una foto de tu identificación oficial (INE)
        </h3>
        <label>Frente</label>
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFrontChange}
        />
        <label>Atrás</label>
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleBackChange}
        />
        <div className="row">
          <div className="col-12 col-md-6">{renderFrontImage()}</div>
          <div className="col-12 col-md-6">{renderBackImage()}</div>
        </div>
        <button
          className="btn btn-primary w-100"
          disabled={isDisabled}
          onClick={handleClick}
        >
          {loading ? <div className="spinner-border"></div> : "Continuar"}
        </button>
      </div>
      {renderCancel()}
    </div>
  );
};

export default UploadUserIdentity;
