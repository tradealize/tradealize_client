import api from "./api";

const route = "/products";

export default {
  getAvailableProducts: () => api.get(`${route}/available`),
  getAllProducts: () => api.get(route),
  getSingleProduct: (product_id) => api.get(`${route}/${product_id}`),
};
