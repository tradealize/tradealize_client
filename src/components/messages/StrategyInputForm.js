import React, { useRef, useState, useEffect, useContext } from "react";
import { setupTooltips } from "../../utils";
import useTranslations from "../../hooks/useTranslations";
import { MessagesContext } from "../../context/MessagesContext";

const StrategyInputForm = ({
  spinner,
  handleSubmit,
  addGenerateBtn,
  handleGenerateBtn,
}) => {
  const inputRef = useRef(null);
  const textArea = useRef(null);
  const translations = useTranslations();
  const [files, setFiles] = useState([]);
  const [srcSet, setSrcSet] = useState([]);
  const [loading, setLoading] = useState(false);

  const { prompt, setPrompt } = useContext(MessagesContext);

  useEffect(() => {
    setupTooltips();
    return () => {
      setPrompt("");
    };
  }, []);

  useEffect(() => {
    const setupHeight = () => {
      if (prompt === "") {
        textArea.current.style.height = "0px";
      } else {
        textArea.current.style.height = textArea.current.scrollHeight + "px";
      }
    };

    setupHeight();
  }, [textArea, prompt]);

  useEffect(() => {
    if (files !== null && files.length > 0) {
      const fileSet = [];
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        let reader = new FileReader();

        const currentPromise = new Promise((resolve, reject) => {
          reader.readAsDataURL(file);

          reader.onload = (e) => {
            let src = e.target.result;
            fileSet.push({ src, index: i });
            resolve();
          };
        });

        promises.push(currentPromise);
      }

      Promise.all(promises).then(() => {
        setSrcSet(fileSet);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleFileInput = () => {
    if (inputRef && inputRef !== null) {
      inputRef.current.click();
    }
  };

  const handleFiles = (e) => {
    const { files } = e.target;
    setFiles(files);
  };

  const removeFile = (index) => {
    let currentFiles = [...files];
    currentFiles.splice(index, 1);
    setFiles(currentFiles);
  };

  const renderFiles = () => {
    if (srcSet.length > 0) {
      return (
        <div className="mt-2 ms-2 mb-3 reply">
          {srcSet.map(({ src, index }) => (
            <div key={index} className="position-relative d-inline-block">
              <img
                src={src}
                className="mx-2 br-10"
                style={{ width: 50, height: 50, objectFit: "contain" }}
              />
              <button
                style={{ position: "absolute", top: -15, right: -5 }}
                className="btn text-danger"
                onClick={() => removeFile(index)}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      );
    }
  };
  return (
    <div id="message-input" className="card p-2 w-100">
      {renderFiles()}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({ prompt, files });
          setPrompt("");
          setFiles([]);
          setSrcSet([]);
        }}
        className="row"
      >
        <div className="container-fluid mb-3">
          <textarea
            type="text"
            ref={textArea}
            value={prompt}
            className="form-control"
            placeholder={translations.conversation.input.placeholder}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="col-6">
          <button
            type="button"
            onClick={handleFileInput}
            className={`btn btn-sm px-3 
            btn-outline-primary me-2`}
          >
            <i className="fas fa-image"></i>{" "}
          </button>
          <input
            type="file"
            ref={inputRef}
            onChange={handleFiles}
            style={{ height: 0, width: 0, visibility: "hidden" }}
          />
          <button
            type="button"
            onClick={handleGenerateBtn}
            className={`${addGenerateBtn ? "" : "d-none"} btn btn-sm px-3 
            btn-outline-primary me-2`}
          >
            <i className="fa fa-arrow-left me-2"></i>
            Back
          </button>
        </div>
        <div className="col-6 text-end">
          <button
            type="submit"
            disabled={spinner || loading || String(prompt).length < 10}
            className="btn btn-primary ps-2"
          >
            {spinner ? (
              <div className="spinner-border"></div>
            ) : (
              <span>
                <i className="fa fa-paper-plane me-2"></i>
                {translations.conversation.input.send}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StrategyInputForm;
