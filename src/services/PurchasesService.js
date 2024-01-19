import api from "./api";
import { getArgs } from "../utils";

const route = "/purchases";

const PurchasesService = {
  postPurchase: (purchase_data) => api.post(`${route}/admin`, { purchase_data }),
  getPurchases: () => api.get(route),
  getPurchasesAdmin: (filters) => api.get(`${route}/admin?${getArgs(filters)}`),
  getSinglePurchase: (purchase_id) => api.get(`${route}/${purchase_id}`),
  updatePurchase: (purchase) => api.put(`${route}/admin`, { ...purchase }),
  getPurchase: (purchase_id) => api.get(`${route}/${purchase_id}`),
  cancelSubscription: (purchase_id, cancel_reason) =>
    api.post(`${route}/cancel/${purchase_id}`, {
      cancel_reason,
      status: "cancelled",
    }),
};

export default PurchasesService;
