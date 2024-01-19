import React, { useContext } from "react";
import DynamicForm from "../global/DynamicForm";
import { ConversationsContext } from "../../context/ConversationsContext";
import useTranslations from "../../hooks/useTranslations";

const ConversationForm = ({ handleCancel }) => {
  const translations = useTranslations();
  const { spinner, conversation, saveConversation, setPropertyConversation } =
    useContext(ConversationsContext);

  const questions = [
    {
      id: "name",
      type: "text",
      required: true,
      label: translations.conversation.form.name,
    },
  ];

  return (
    <DynamicForm
      spinner={spinner}
      object={conversation}
      questions={questions}
      handleCancel={handleCancel}
      saveAction={saveConversation}
      modifier={setPropertyConversation}
    />
  );
};

export default ConversationForm;
