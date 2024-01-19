import React, { useRef, useState, useContext, useEffect } from "react";
import ConversationHeader from "../components/conversations/ConversationHeader";
import StrategyInputForm from "../components/messages/StrategyInputForm";
import { ConversationsContext } from "../context/ConversationsContext";
import { MessagesContext } from "../context/MessagesContext";
import MessageCard from "../components/messages/MessageCard";
import useTranslations from "../hooks/useTranslations";
import { setupTooltips } from "../utils";

const SingleConversation = ({
  handleGenerateBtn,
  conversation_id,
  addGenerateBtn,
  titleGradient,
}) => {
  const refContainer = useRef(null);

  const [page, setPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);
  const [smallDevice, setSmallDevice] = useState(false);

  const translations = useTranslations();

  const { conversation, setConversation, getSingleConversation } =
    useContext(ConversationsContext);

  const {
    max,
    messages,
    generating,
    saveMessage,
    clearMessages,
    getConversationMessages,
  } = useContext(MessagesContext);

  useEffect(() => {
    handleScreenWidth();
    getSingleConversation(conversation_id);

    return () => {
      setConversation(null);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    clearMessages();
  }, [conversation_id]);

  useEffect(() => {
    setupTooltips();
    if (firstLoad) handleScrollBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, [conversation]);

  const handleScreenWidth = () => {
    window.screen.width >= 1200 ? setSmallDevice(false) : setSmallDevice(true);

    window.addEventListener("resize", () => {
      window.screen.width >= 1200
        ? setSmallDevice(false)
        : setSmallDevice(true);
    });
  };

  const fetchMessages = () => {
    getConversationMessages(conversation_id, { page });
  };

  const handleScrollBottom = () => {
    const container = refContainer.current;
    refContainer.current?.scrollTo({
      top: firstLoad
        ? container.offsetHeight * 10
        : container.offsetHeight * messages.length * 2,
    });
    if (firstLoad) setFirstLoad(false);
  };

  const handleScroll = () => {
    const container = refContainer.current;
    const scrollTop = container.scrollTop;
    if (scrollTop === 0 && Array.isArray(messages)) {
      if (messages.length < max) {
        setPage(page + 1);
      }
    }
  };

  const handleMessage = ({ prompt, files }) => {
    saveMessage(
      {
        content: prompt,
        conversation_id,
        files,
      },
      fetchMessages
    );
  };

  const renderMax = () => {
    if (Array.isArray(messages)) {
      if (messages.length <= max) {
        return (
          <div className="d-flex mt-3 justify-content-center">
            <span className="border bg-accent badge badge-pill mb-3 m-auto d-inline-block">
              {translations.conversation.max_messages}
            </span>
          </div>
        );
      }
    }
  };

  const renderMessages = () => {
    if (Array.isArray(messages)) {
      return messages.map((message, index) => {
        return (
          <MessageCard
            message={message}
            key={message.message_id}
            handleCallback={fetchMessages}
            prevMessage={messages[index - 1]}
          />
        );
      });
    }
  };

  const renderSpinner = () => {
    if (generating) {
      return (
        <div className="loading mb-3">
          <span>Hold tight, Fetch is working on your instruction</span>
        </div>
      );
    }
  };

  const renderContinue = () => {
    if (!generating && Array.isArray(messages)) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage !== null) {
        if (lastMessage.finish_reason === "length") {
          return (
            <button
              className="btn border"
              onClick={() => handleMessage("Continue generating last response")}
            >
              <i className="fa fa-forward me-2"></i>{" "}
              {translations.conversation.continue}
            </button>
          );
        }
      }
    }
  };

  const renderContent = () => {
    let componentActive = true;
    if (smallDevice) componentActive = false;

    if (componentActive) {
      return (
        <div
          className="position-relative h-100 d-flex card flex-column flex-nowrap align-items-center px-0"
          style={{
            order: 1,
          }}
        >
          <ConversationHeader titleGradient={titleGradient} />
          <div
            className="row overflow-hidden position-relative"
            style={{
              flex: 1,
            }}
          >
            <div id="messages" ref={refContainer} className="px-4 h-100">
              {renderMax()}
              {renderMessages()}
              {renderSpinner()}
              {renderContinue()}
            </div>
          </div>
          <StrategyInputForm
            spinner={generating}
            handleSubmit={handleMessage}
            addGenerateBtn={addGenerateBtn}
            handleGenerateBtn={handleGenerateBtn}
          />
        </div>
      );
    }
  };

  return (
    <div
      id="conversation"
      onScroll={handleScroll}
      className=" h-100 d-flex row justify-content-around"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {renderContent()}
    </div>
  );
};

export default SingleConversation;
