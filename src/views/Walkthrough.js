import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import SingleConversation from "./SingleConversation";
import { Link } from "@reach/router";
import Upgrade from "./Upgrade";
import { ConversationsContext } from "../context/ConversationsContext";

const Walkthrough = () => {
  const [conversationId, setConversationId] = useState(null);
  const { conversations } = useContext(ConversationsContext);
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null && Array.isArray(conversations)) {
      const conversation = conversations[0];
      if (conversation) setConversationId(conversation.conversation_id);
    }
  }, [user, conversations]);

  const renderConversation = () => {
    if (conversationId !== null) {
      return <SingleConversation conversation_id={conversationId} />;
    }
    return (
      <Upgrade>
        <p>
          Creating more content with{" "}
          <span className="text-accent">
            Bemodo's AI Content Assitant "Fetch"
          </span>{" "}
          requires an active subscription to BemodoAI.
        </p>
      </Upgrade>
    );
  };

  return (
    <div id="walkthrough" className="container-fluid">
      {renderConversation()}
    </div>
  );
};

export default Walkthrough;
