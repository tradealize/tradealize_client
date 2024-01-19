import { PAYMENT_METHODS_RECIBIDOS } from "../types";

const PaymentMethodsReducer = (state, { type, payload }) => {
  switch (type) {
    case PAYMENT_METHODS_RECIBIDOS:
      return { ...state, payment_methods: payload };
    default:
      return { ...state };
  }
};
export default PaymentMethodsReducer;
