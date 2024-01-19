import api from "./api";
import { getArgs } from "../utils";
const route = "/users";

const userService = {
  getCurrentUser: () => api.get(route),
  getUserByPhone: (phone) => api.get(`${route}/phone?phone=${phone}`),
  getAllUsers: (filters) => api.get(`${route}/admin/all?${getArgs(filters)}`),
  getSingleUser: (user_id) => api.get(`${route}/${user_id}/admin`),
  postSignUp: (data) => api.post(route, { ...data }),
  updateCurrentUser: (data) => api.put(route, { ...data }),
  recoverPassword: (email) => api.post(`${route}/recover`, { email }),
  deleteCurrentUser: () => api.delete(route),
  deleteUser: (user_id) => api.delete(`${route}/${user_id}`),
};

export default userService;
