import api from "./api";

const route = "/payment_sources";

export default {
  getPaymentSources: () => api.get(route),
  deletePaymentSource: (payment_source_id) =>
    api.delete(`${route}/${payment_source_id}`),
  postPaymentSource: (payment_source) => api.post(route, { ...payment_source }),
};
