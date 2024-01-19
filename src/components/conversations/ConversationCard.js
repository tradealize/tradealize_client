import { Link } from "@reach/router";
import React, { useContext } from "react";
import ConversationForm from "./ConversationForm";
import { ConversationsContext } from "../../context/ConversationsContext";
import { ModalContext } from "../../context/ModalContext";

const ConversationCard = ({ conversation, link, handleCallback }) => {
  const { clearModal, modalComponent } = useContext(ModalContext);
  const { setConversation, saveConversation, deleteConversation } =
    useContext(ConversationsContext);

  const conversationId = conversation.conversation_id;
  const currentLink = link
    ? `${link}/${conversationId}`
    : `/conversations/${conversationId}`;

  const handleCancel = () => {
    setConversation(null);
    clearModal();
  };

  const handleClick = () => {
    if (typeof handleCallback === "function") {
      handleCallback();
    }
  };

  const handleArchiveChat = () => {
    saveConversation({ ...conversation, archived: !conversation.archived });
  };

  const handleEdit = () => {
    setConversation(conversation);
    modalComponent(
      "Edit Conversation",
      <ConversationForm handleCancel={handleCancel} />
    );
  };

  const handleDelete = () => {
    modalComponent(
      "Delete Conversation",
      <div>
        <p>
          Are you sure you want to delete this conversation? This action CANNOT
          be reversed.
        </p>
        <div className="row">
          <div className="col-6">
            <button onClick={clearModal} className="btn w-100 text-muted">
              Cancel
            </button>
          </div>
          <div className="col-6">
            <button
              onClick={() => deleteConversation(conversation.conversation_id)}
              className="btn w-100 btn-danger"
            >
              <i className="fa fa-trash me-2"></i>Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTags = () => {
    if (conversation.tags !== null) {
      let tags = String(conversation.tags).split(",");
      return tags.map((tag, tagIndex) => {
        if (tagIndex <= 2) {
          return (
            <span key={tag} className="badge badge-pill bg-accent me-1">
              {tag}
            </span>
          );
        }
      });
    }
  };

  return (
    <div
      className="card position-relative bg-light mb-3 my-3"
      style={{
        height: "130px",
      }}
    >
      <div className="card-body pb-2 position-relative">
        {conversation.name}

        <div className="col-6 pe-2 mb-1 w-100">{renderTags()}</div>
      </div>

      <div className="card-footer bg-light border-0 pb-3">
        <button
          onClick={handleArchiveChat}
          className="btn btn-sm btn-round border"
        >
          <i className="fa fa-archive"></i>
        </button>
        <button
          onClick={handleEdit}
          className="btn btn-sm btn-round border ms-2"
        >
          <i className="fa fa-edit"></i>
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-outline-danger btn-round ms-2"
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
      <Link
        to={currentLink}
        onClick={handleClick}
        className="btn btn-primary btn-view"
      >
        <i className="fa fa-comments"></i>
      </Link>
    </div>
  );
};

export default ConversationCard;
