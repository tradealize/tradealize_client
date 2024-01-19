import api from "./api";
import { getArgs } from "../utils";

const route = "/messages";

const MessagesService = {
  getMessages: (filters) => api.get(`${route}?${getArgs(filters)}`),
  getConversationMessages: (conversation_id, filters) =>
    api.get(`${route}/conversation/${conversation_id}?${getArgs(filters)}`),
  getThreadMessages: (assistant_id) =>
    api.get(`${route}/thread/${assistant_id}`),
  postMessage: (message) => api.post(route, { ...message }),
  putMessage: (message) => api.put(route, { ...message }),
  deleteMessage: (message_id) => api.delete(`${route}/${message_id}`),
  shareMessage: (message) => api.post(`${route}/share/`, { ...message }),
};
export default MessagesService;
