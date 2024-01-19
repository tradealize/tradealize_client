import React, { useContext } from "react";
import ConversationCard from "./ConversationCard";
import useTranslations from "../../hooks/useTranslations";
import { ConversationsContext } from "../../context/ConversationsContext";

const ConversationList = ({ size, searchable, handleCallback, link }) => {
  const translations = useTranslations();
  const { conversations } = useContext(ConversationsContext);

  const renderConversations = () => {
    if (Array.isArray(conversations)) {
      if (conversations.length === 0) {
        return <p>{translations.conversations.empty}</p>;
      }
      let conversationsRender = [...conversations];
      if (searchable) {
        conversationsRender = conversationsRender.slice(0, 5);
      }
      return conversationsRender.map((conversation) => (
        <div
          key={conversation.conversation_id}
          className={
            size === "lg"
              ? "col-12 px-0"
              : "col-12 col-md-6 col-xl-4 position-relative ps-0"
          }
          style={{ height: "max-content" }}
        >
          <ConversationCard
            conversation={conversation}
            handleCallback={handleCallback}
            link={link}
          />
        </div>
      ));
    }
  };

  return (
    <div
      className="row h-max align-items-start"
      style={{ overflowY: "auto", height: "max-content" }}
    >
      {renderConversations()}
    </div>
  );
};

export default ConversationList;
