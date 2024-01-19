import { getArgs } from "../utils";
import api from "./api";

const route = "/staff";

export default {
  getAllStaff: (filters) => api.get(`${route}/admin/all?${getArgs(filters)}`),
  postStaff: (email, role) => api.post(route, { email, role }),
  putStaff: (staff_id, role) => api.put(route, { staff_id, role }),
  deleteStaff: (staff_id) => api.delete(`${route}/${staff_id}`),
};
