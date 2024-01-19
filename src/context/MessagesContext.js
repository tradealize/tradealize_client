import React, { useReducer, createContext, useContext } from "react";
import MessagesReducer from "../reducers/MessagesReducer";
import {
  SET_PROPERTY_MESSAGE,
  MESSAGES_RECEIVED,
  CREATE_MESSAGE,
  APPEND_MESSAGE,
  SET_MESSAGE,
  CLEAR_MESSAGES,
  SET_PROMPT,
  SET_PROPERTY_MESSAGE_PLURAL,
  SAVE_MESSAGE,
  SET_GENERATING,
} from "../types/messages";
import MessagesService from "../services/MessagesService";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";
import { HIDE_SPINNER } from "../types";
import useTranslations from "../hooks/useTranslations";
import { SET_CONVERSATION } from "../types/conversations";
import FilesService from "../services/FilesService";

const initialState = {
  conversation: null,
  generating: false,
  runingThread: false,
  enhancing: false,
  message_id: null,
  spinner: false,
  messages: null,
  message: null,
  prompt: "",
  max: null,
  threadMessages: [],
};

export const MessagesContext = createContext(initialState);

export const MessagesProvider = ({ children }) => {
  const translations = useTranslations();

  const [state, dispatch] = useReducer(MessagesReducer, initialState);

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

  const getMessages = (filters) => {
    MessagesService.getMessages(filters).then((res) => {
      const { messages, max } = res.data;
      dispatch({ type: MESSAGES_RECEIVED, payload: { messages, max } });
    });
  };

  const getConversationMessages = (conversation_id, filters) => {
    MessagesService.getConversationMessages(conversation_id, filters).then(
      (res) => {
        const { messages, max } = res.data;
        dispatch({ type: MESSAGES_RECEIVED, payload: { messages, max } });
      }
    );
  };

  const appendMessage = (message) => {
    dispatch({ type: APPEND_MESSAGE, payload: message });
  };

  const setGenerating = (payload) => {
    dispatch({ type: SET_GENERATING, payload: payload });
  };

  const setConversation = (conversation) => {
    dispatch({ type: SET_CONVERSATION, payload: conversation });
  };

  const saveMessage = (message, callback) => {
    let service = MessagesService.putMessage;

    if (isNaN(parseInt(message.message_id))) {
      service = MessagesService.postMessage;
      dispatch({ type: SET_GENERATING, payload: true });
    }
    const promises = [];

    if (message.files && message.files !== null) {
      for (let i = 0; i < message.files.length; i++) {
        const file = message.files[i];
        const currentPromise = new Promise((resolve, reject) => {
          const formData = FilesService.getFormData(file);
          FilesService.postFile(formData)
            .then((res) => {
              const { file_id } = res.data;
              message.file_id = file_id;
              resolve();
            })
            .catch(reject);
        });
        promises.push(currentPromise);
      }
    }

    Promise.all(promises).then(() => {
      service(message)
        .then((res) => {
          if (typeof callback === "function") {
            callback(res.data.message);
          }
          if (res.data.message) {
            dispatch({ type: APPEND_MESSAGE, payload: res.data.message });
          }
        })
        .catch(handleError);
    });
  };

  const createMessage = () => {
    dispatch({ type: CREATE_MESSAGE });
  };

  const setMessage = (message) => {
    dispatch({ type: SET_MESSAGE, payload: message });
  };

  const setPropertyMessage = (key, value) => {
    dispatch({ type: SET_PROPERTY_MESSAGE, payload: { key, value } });
  };

  const setPropertyMessagePlural = (message_id, key, value) => {
    dispatch({
      type: SET_PROPERTY_MESSAGE_PLURAL,
      payload: { message_id, key, value },
    });
  };

  const deleteMessage = (message_id, showSuccess) => {
    return new Promise((resolve, reject) => {
      MessagesService.deleteMessage(message_id)
        .then(() => {
          if (showSuccess) success(translations.messages.deleted);

          resolve();
        })
        .catch((err) => {
          handleError(err);
          reject(err);
        });
    });
  };

  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGES });
  };

  const setPrompt = (prompt) => {
    dispatch({ type: SET_PROMPT, payload: prompt });
  };

  const saveMessageContent = (message_id) => {
    dispatch({ type: SAVE_MESSAGE, payload: message_id });
  };

  return (
    <MessagesContext.Provider
      value={{
        ...state,
        setPrompt,
        setMessage,
        saveMessage,
        getMessages,
        clearMessages,
        createMessage,
        deleteMessage,
        appendMessage,
        setGenerating,
        setConversation,
        setPropertyMessage,
        saveMessageContent,
        getConversationMessages,
        setPropertyMessagePlural,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
