import api from "./api";

const route = "/discounts";

export default {
  getSingleDescuento: (discount_id) =>
    api.get(`${route}/descuento/${discount_id}`),
  validarDescuento: (code, product_id) =>
    api.get(`${route}/code/${code}?product_id=${product_id}`),
  getDescuentosAdmin: () => api.get(`${route}/admin`),
  postDescuento: (descuento) => api.post(route, { ...descuento }),
  putDescuento: (descuento) => api.put(route, { ...descuento }),
  deleteDescuento: (discount_id) => api.delete(`${route}/${discount_id}`),
};
