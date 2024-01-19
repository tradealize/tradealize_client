import api from "./api";

const route = "/checkout";

const CheckoutService = {
  postCheckout: (payload) =>
    api.post(`${route}/attempt`, {
      ...payload,
    }),
  capturePayPal: (payload) => api.post(`${route}/capture`, { ...payload }),
};

export default CheckoutService;
