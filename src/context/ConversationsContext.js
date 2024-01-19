import React, { useReducer, createContext, useContext } from "react";
import ConversationsReducer from "../reducers/ConversationsReducer";
import {
  CONVERSATIONS_RECEIVED,
  CREATE_CONVERSATION,
  SET_CONVERSATION,
  SET_PROPERTY_CONVERSATION,
  TAGS_RECEIVED,
} from "../types/conversations";
import ConversationsService from "../services/ConversationsService";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";
import useTranslations from "../hooks/useTranslations";
import { HIDE_SPINNER, SHOW_SPINNER } from "../types";

const initialState = {
  conversations: null,
  conversation: null,
  spinner: false,
};

export const ConversationsContext = createContext(initialState);

export const ConversationsProvider = ({ children }) => {
  const translations = useTranslations();
  const [state, dispatch] = useReducer(ConversationsReducer, initialState);
  const { alert, success, clearModal } = useContext(ModalContext);

  const handleError = (error) => {
    dispatch({ type: HIDE_SPINNER });
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.error) {
          if (error.response.data.error.code) {
            return alert(`Open AI Error: ${error.response.data.error.message}`);
          }
        }
      }
      if (error.response.status === 412) {
        clearModal();
        return navigate("/sorry");
      }
    }
    alert(error);
  };

  const getConversations = (filters) => {
    ConversationsService.getConversations(filters).then((res) => {
      const { conversations } = res.data;
      dispatch({ type: CONVERSATIONS_RECEIVED, payload: conversations });
    });
  };

  const getSingleConversation = (conversation_id) => {
    ConversationsService.getSingleConversations(conversation_id).then((res) => {
      const { conversation } = res.data;
      dispatch({ type: SET_CONVERSATION, payload: conversation });
    });
  };

  const getAllTags = (filters) => {
    ConversationsService.getAllTags(filters)
      .then((res) => {
        const { tags } = res.data;
        dispatch({ type: TAGS_RECEIVED, payload: tags });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveConversation = (conversation) => {
    dispatch({ type: SHOW_SPINNER });
    let service = ConversationsService.putConversation;
    if (isNaN(parseInt(conversation.conversation_id))) {
      service = ConversationsService.postConversation;
    }

    service(conversation)
      .then((res) => {
        dispatch({ type: HIDE_SPINNER });
        const { conversation } = res.data;

        const successMessage = conversation.archived
          ? translations.conversations.archived
          : translations.conversations.saved;

        success(successMessage);

        setConversation(conversation);
        getConversations();
        clearModal();
      })
      .catch(handleError);
  };

  const createConversation = () => {
    dispatch({ type: CREATE_CONVERSATION });
  };

  const setConversation = (conversation) => {
    dispatch({ type: SET_CONVERSATION, payload: conversation });
  };

  const setPropertyConversation = (key, value) => {
    dispatch({ type: SET_PROPERTY_CONVERSATION, payload: { key, value } });
  };

  const deleteConversation = (conversation_id) => {
    return new Promise((resolve, reject) => {
      ConversationsService.deleteConversation(conversation_id)
        .then(() => {
          success(translations.conversations.deleted);
          navigate("/conversations");
          getConversations();
          clearModal();
          resolve();
        })
        .catch((err) => {
          handleError(err);
          reject(err);
        });
    });
  };

  const clearConversations = () => {
    dispatch({ type: CONVERSATIONS_RECEIVED, payload: null });
  };

  return (
    <ConversationsContext.Provider
      value={{
        ...state,
        getAllTags,
        setConversation,
        getConversations,
        saveConversation,
        clearConversations,
        createConversation,
        deleteConversation,
        getSingleConversation,
        setPropertyConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
