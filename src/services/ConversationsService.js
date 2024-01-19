import { getArgs } from "../utils";
import api from "./api";
const route = "/conversations";

const ConversationsService = {
  getAllTags: (filters) => api.get(`${route}/tags?${getArgs(filters)}`),
  getConversations: (filters) => api.get(`${route}?${getArgs(filters)}`),
  getSingleConversations: (conversation_id) =>
    api.get(`${route}/single/${conversation_id}`),
  postConversation: (conversation) => api.post(route, { ...conversation }),
  putConversation: (conversation) => api.put(route, { ...conversation }),
  deleteConversation: (conversation_id) =>
    api.delete(`${route}/${conversation_id}`),
};
export default ConversationsService;
