import { HIDE_SPINNER, SHOW_SPINNER } from "../types";
import {
  CONVERSATIONS_RECEIVED,
  CREATE_CONVERSATION,
  SET_CONVERSATION,
  SET_PROPERTY_CONVERSATION,
  TAGS_RECEIVED,
} from "../types/conversations";

const schema = {
  conversation_id: "",
  name: "",
};

const ConversationsReducer = (state, { type, payload }) => {
  switch (type) {
    case CONVERSATIONS_RECEIVED:
      return { ...state, conversations: payload };
    case SET_CONVERSATION:
      return { ...state, conversation: payload };
    case CREATE_CONVERSATION:
      return { ...state, conversation: schema };
    case TAGS_RECEIVED:
      return { ...state, tags: payload };
    case SET_PROPERTY_CONVERSATION:
      const { key, value } = payload;
      const conversation = { ...state.conversation };
      conversation[key] = value;
      return { ...state, conversation };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    default:
      return { ...state };
  }
};
export default ConversationsReducer;
