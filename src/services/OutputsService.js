import api from "./api";
import { getArgs } from "../utils";

const route = "/outputs";

const OutputsService = {
  getAvatarOutputs: (avatar_id, filters) =>
    api.get(`${route}/avatar/${avatar_id}?${getArgs(filters)}`),
  getTrainingOutputs: (training_id, filters) =>
    api.get(`${route}/training/${training_id}?${getArgs(filters)}`),
  postOutput: (data) => api.post(route, { ...data }),
  generateOutput: (data) => api.post(`${route}/generate`, { ...data }),
  postOutputMessage: (message) => api.post(`${route}/message`, { ...message }),
  rateOutput: (output) => api.post(`${route}/rate`, { ...output }),
  putOutput: (output) => api.put(route, { ...output }),
  deleteOutput: (output_id) => api.delete(`${route}/${output_id}`),
};
export default OutputsService;
