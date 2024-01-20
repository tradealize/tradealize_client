import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";
import useTranslations from "../hooks/useTranslations";
import { ConversationsContext } from "../context/ConversationsContext";
import ConversationList from "../components/conversations/ConversationList";
import ConversationsActions from "../components/conversations/ConversationsActions";

const Conversations = ({ tag }) => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [viewArchived, setViewArchived] = useState(false);
  const { setSelected } = useContext(MenuContext);
  const [filter, setFilter] = useState("");

  const translations = useTranslations();
  const { user } = useContext(AuthContext);
  const { getConversations, getAllTags, tags, conversation } =
    useContext(ConversationsContext);

  const isTagsPath = window.location.pathname.includes("/conversation/tags/");
  const isNotRootTagsPath = window.location.pathname !== "/conversation/tags";

  useEffect(() => {
    if (isTagsPath && tag) {
      getConversations({ query, sortBy, archived: viewArchived, tags: tag });
    } else if (!isTagsPath) {
      getConversations({ query, sortBy, archived: viewArchived });
      getAllTags({ query });
      setSelected("Fetch");
    }
  }, [query, viewArchived, sortBy, tag]);

  useEffect(() => {
    getAllTags({ query });
  }, [conversation]);

  const renderConversations = () => {
    return <ConversationList />;
  };

  return (
    <div className="container-fluid bg-white p-4 card position-relative h-100">
      <div className="row">
        <div className="col-6 mb-2 col-md-12 col-xl-4 ps-0">
          <h1 className="mb-0 h2 text-capitalize text-gradient d-inline-block">
            {translations.conversations.title}
          </h1>
        </div>
        <div className="col-6 mb-2 text-end justify-content-end show-mobile pe-0">
          <ConversationsActions
            filter={filter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setFilter={setFilter}
            viewArchived={viewArchived}
            setViewArchived={setViewArchived}
            isTagsPath={isTagsPath}
          />
        </div>
        <div className="col-12 mb-2 col-md-12 col-xl-8 px-0">
          <div className="row">
            <div className="col-12 col-md-8 px-0">
              <input
                type="text"
                value={query}
                className="form-control"
                placeholder={translations.conversations.search}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 hide-mobile">
              <ConversationsActions
                filter={filter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setFilter={setFilter}
                viewArchived={viewArchived}
                setViewArchived={setViewArchived}
                isTagsPath={isTagsPath}
              />
            </div>
          </div>
        </div>
      </div>

      {renderConversations()}
    </div>
  );
};

export default Conversations;
