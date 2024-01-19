import { getArgs } from "../utils";
import api from "./api";
const route = "/invoices";

export default {
  getInvoices: (filters) =>
    api.get(
      `${route}/admin?${getArgs(
        filters
      )}`
    ),
  postInvoice: (invoice) => api.post(`${route}/admin`, { ...invoice }),
  putInvoice: (invoice) => api.put(`${route}/admin`, { ...invoice }),
};
