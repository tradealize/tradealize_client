import api from "./api";

const route = "/payment_method";

const PaymentMethodsService = {
  getPaymentMethods: () => api.get(route),
};

export default PaymentMethodsService;
