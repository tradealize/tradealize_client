import React, { useContext } from "react";
import { ConversationsContext } from "../../context/ConversationsContext";
import { ModalContext } from "../../context/ModalContext";
import useTranslations from "../../hooks/useTranslations";
import ConversationForm from "./ConversationForm";

const ConversationsActions = () => {
  const translations = useTranslations();
  const { modalComponent } = useContext(ModalContext);
  const { clearModal, createConversation } = useContext(ConversationsContext);

  const handleCreateConversation = () => {
    createConversation();
    modalComponent(
      translations.conversations.add,
      <ConversationForm handleCancel={clearModal} />
    );
  };

  return (
    <div className="container-fluid">
      <button
        className="btn btn-outline-primary"
        onClick={handleCreateConversation}
      >
        + {translations.conversations.button}
      </button>
    </div>
  );
};

export default ConversationsActions;
