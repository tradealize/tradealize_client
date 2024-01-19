import React, { useContext } from "react";
import { ConversationsContext } from "../../context/ConversationsContext";
import { ModalContext } from "../../context/ModalContext";
import ConversationForm from "./ConversationForm";
import useTranslations from "../../hooks/useTranslations";

const ConversationHeader = ({ titleGradient }) => {
  const translations = useTranslations();
  const { conversation } = useContext(ConversationsContext);
  const { clearModal, modalComponent } = useContext(ModalContext);

  const handleEdit = () => {
    modalComponent(
      translations.conversation.edit,
      <ConversationForm handleCancel={clearModal} />
    );
  };

  const renderName = () => {
    if (conversation && conversation !== null) {
      return (
        <h1
          className={`h5 bold ${
            titleGradient ? "text-gradient" : ""
          }  d-inline-block mb-0`}
        >
          {conversation.name}
        </h1>
      );
    }
  };

  const renderActions = () => {
    if (conversation && conversation !== null) {
      return (
        <div>
          <button
            type="button"
            onClick={handleEdit}
            className="btn border btn-round btn-sm"
          >
            <i className="fa fa-edit"></i>
          </button>
        </div>
      );
    }
  };

  return (
    <div
      id="conversation-header"
      className="row mx-0 align-items-center p-2 pt-3"
    >
      <div className="col-6 col-md-6">{renderName()}</div>
      <div className="col-6 col-md-6 text-end">{renderActions()}</div>
    </div>
  );
};
export default ConversationHeader;
