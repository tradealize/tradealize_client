import React, { useState, useContext, useEffect, useRef } from "react";
import { MessagesContext } from "../../context/MessagesContext";
import { ModalContext } from "../../context/ModalContext";
import useTranslations from "../../hooks/useTranslations";
import ShareMessageForm from "./ShareMessage/ShareMessageForm";
import { AppConfigContext } from "../../context/AppConfigContext";

const MessageCard = ({ message, handleCallback }) => {
  const { success, alert, clearModal, modalComponent } =
    useContext(ModalContext);
  const { S3_ENDPOINT } = useContext(AppConfigContext);
  const { saveMessage } = useContext(MessagesContext);

  const [editedText, setEditedText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const translations = useTranslations();

  const { formatDateTime } = translations;

  useEffect(() => {
    if (copied) {
      success(translations.general.clipboard);
    }
  }, [copied]);

  const handleCopy = () => {
    const content = contentRef.current;
    if (content) {
      content.style.backgroundColor = "white";
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(content);
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand("copy");
      } catch (e) {
        alert("Unable to copy content to clipboard. Please copy manually.");
      } finally {
        selection.removeAllRanges();
        setCopied(true);
        content.style.backgroundColor = "inherit";
      }
    }
  };

  const clearEdit = () => {
    setEditMode(false);
    setEditedText("");
  };

  const handleEdit = () => {
    if (editMode) {
      clearEdit();
      return saveMessage({ ...message, content: editedText }, handleCallback);
    }
    setEditMode(true);
    setEditedText(message.content);
  };

  const handleShare = () => {
    modalComponent(
      "Share Content",
      <ShareMessageForm message={message} handleCancel={clearModal} />
    );
  };

  const renderMessage = () => {
    if (editMode) {
      return (
        <textarea
          rows="10"
          type="text"
          value={editedText}
          className="form-control mb-3"
          onChange={(e) => setEditedText(e.target.value)}
        />
      );
    }
    if (message.content === null) {
      return translations.conversation.message.pending;
    }
    let { content } = message;
    content = String(message.content);
    return content;
  };
  const renderFile = () => {
    if (message.file && message.file !== null) {
      return (
        <img
          src={`${S3_ENDPOINT}/${message.file.name}.${message.file.type}`}
          className="mw-100 w-100 d-block m-auto mb-3"
        />
      );
    }
  };

  return (
    <div
      className={`card p-3 mb-3 message-card ${
        message.role === "assistant"
          ? "ms-0 me-auto bg-accent-light"
          : "ms-auto me-0 bg-light"
      }`}
    >
      <div data-color-mode="light" ref={contentRef}>
        {renderFile()}
        {renderMessage()}
      </div>
      <div className="row align-items-center px-0 mt-3">
        <div className="col-12 col-md-6 px-0">
          <p className="small mb-0 text-muted">
            {formatDateTime(message.createdAt)}
          </p>
        </div>
        <div className="col-12 col-md-6 text-end">
          {message.role !== "user" && (
            <button
              key="copy"
              onClick={handleCopy}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={translations.conversation.message.copy}
              className="btn border-0 btn-round btn-sm btn-outline-dark"
            >
              <i className="fa fa-copy"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
