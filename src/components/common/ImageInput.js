import React, { useState, useEffect } from "react";

const ImageInput = ({ value, modifier, multiple, hideImage }) => {
  const [src, setSrc] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (value && file === null) {
      setSrc(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (file !== null) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let src = e.target.result;
        setSrc(src);
      };
      reader.readAsDataURL(file);
      if (typeof modifier === "function") {
        modifier(file);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const renderImages = () => {
    if (src !== "") {
      return (
        <div className="col-4">
          <img
            src={src}
            alt="Preview"
            className="mw-100 w-100 m-auto d-block"
          />
        </div>
      );
    }
    if (multiple && Array.isArray(value)) {
    }
  };

  const renderImagen = (e) => {
    if (multiple) {
      return modifier(e.target.files);
    }
    setFile(e.target.files[0]);
  };

  const selectFile = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="container-fluid px-0 mb-2" style={{ position: "relative" }}>
      <div className="row py-2 align-items-center">
        {renderImages()}
        <div className={`col-8 ${!hideImage ? "col-md-6" : ""}`}>
          <input
            id="fileInput"
            type="file"
            onChange={(e) => renderImagen(e)}
            multiple={multiple}
          />
          <button
            className="btn btn-sm px-4 btn-outline-secondary"
            type="button"
            onClick={selectFile}
          >
            <i className="fa fa-image me-2"></i>{" "}
            <span className="small">
              {src !== "" ? "Change" : "Upload"} Image
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
