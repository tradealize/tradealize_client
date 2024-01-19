import React, { useState, useEffect, useContext } from "react";
import ConversationList from "./ConversationList";
import useTranslations from "../../hooks/useTranslations";
import { ConversationsContext } from "../../context/ConversationsContext";

const SearchableConversationList = ({ size, handleCallback, link }) => {
  const [query, setQuery] = useState("");
  const translations = useTranslations();
  const { getConversations, clearConversations } =
    useContext(ConversationsContext);

  useEffect(() => {
    getConversations({ query });
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        className="form-control mb-3"
        placeholder={translations.conversations.search}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ConversationList
        size={size}
        link={link}
        searchable={true}
        handleCallback={handleCallback}
      />
    </div>
  );
};

export default SearchableConversationList;
