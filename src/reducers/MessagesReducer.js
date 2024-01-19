import moment from "moment";
import {
  MESSAGES_RECEIVED,
  CREATE_MESSAGE,
  SET_MESSAGE,
  SET_PROPERTY_MESSAGE,
  APPEND_MESSAGE,
  CLEAR_MESSAGES,
  SET_GENERATING,
  SET_PROMPT,
  SET_PROPERTY_MESSAGE_PLURAL,
  SAVE_MESSAGE,
  SET_THREAD_MESSAGES,
} from "../types/messages";
import { HIDE_SPINNER, SHOW_SPINNER } from "../types";
import { SET_CONVERSATION } from "../types/conversations";

const schema = {
  message_id: "",
  name: "",
};

const MessagesReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_PROMPT:
      return { ...state, prompt: payload };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };

    case SET_GENERATING:
      return { ...state, generating: payload };

    case CLEAR_MESSAGES:
      return { ...state, messages: null };
    case SAVE_MESSAGE: {
      return { ...state, message_id: payload };
    }

    case APPEND_MESSAGE: {
      if (state.enhancing || (state.enhanced && state.enhanced !== null)) {
        return {
          ...state,
          enhanced: payload.content,
          enhancing: false,
        };
      }
      let messages = state.messages;
      if (Array.isArray(messages)) messages = [...messages];
      else messages = [];
      const messageExists =
        messages.find(
          (message) =>
            parseInt(message.message_id) === parseInt(payload.message_id)
        ) !== undefined;
      if (messageExists) {
        return {
          ...state,
          messages,
          enhancing: false,
          enhanced: null,
        };
      }
      const conversation = { ...state.conversation };
      if (conversation && conversation !== null) {
        if (
          parseInt(payload.conversation_id) !==
            parseInt(conversation.conversation_id) &&
          !isNaN(parseInt(conversation.conversation_id))
        ) {
          return {
            ...state,
            messages,
            enhancing: false,
            enhanced: null,
          };
        }
      }
      messages.push(payload);
      messages = messages.sort((a, b) =>
        moment(a.createdAt).isAfter(moment(b.createdAt)) ? 1 : -1
      );
      return {
        ...state,
        messages,
        enhanced: null,
        enhancing: false,
      };
    }
    case SET_CONVERSATION:
      return { ...state, conversation: payload };
    case MESSAGES_RECEIVED: {
      let messages = state.messages;
      if (Array.isArray(messages)) messages = [...messages];
      else messages = [];
      messages = [...payload.messages, ...messages];
      let messagesSet = new Set();
      messages.forEach(({ message_id }) => messagesSet.add(message_id));
      let messagesResult = [];
      messagesSet.forEach((message_id) => {
        let current = messages.find(
          (message) => message.message_id === message_id
        );
        if (current) messagesResult.push(current);
      });
      messages = messagesResult.sort((a, b) =>
        moment(a.createdAt).isAfter(b.createdAt) ? 1 : -1
      );
      return { ...state, messages, max: payload.max };
    }
    case SET_MESSAGE:
      return { ...state, message: payload };
    case SET_THREAD_MESSAGES:
      return { ...state, threadMessages: payload };
    case CREATE_MESSAGE:
      return { ...state, message: schema };
    case SET_PROPERTY_MESSAGE:
      const { key, value } = payload;
      const message = { ...state.message };
      message[key] = value;
      return { ...state, message };
    case SET_PROPERTY_MESSAGE_PLURAL: {
      const { message_id, key, value } = payload;
      let messages = state.messages;
      if (Array.isArray(messages)) messages = [...messages];
      else messages = [];
      const index = messages.findIndex(
        (message) => parseInt(message.message_id) === parseInt(message_id)
      );
      if (index !== -1) {
        if (messages[index][key] === null) {
          messages[index][key] = value;
        } else {
          messages[index][key] += value;
        }
      }
      return { ...state, messages };
    }
    default:
      return { ...state };
  }
};
export default MessagesReducer;
