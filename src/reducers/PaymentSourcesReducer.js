import { PAYMENTSOURCES_RECEIVED } from "../types/payment_sources";

export default (state, { type, payload }) => {
  switch (type) {
    case PAYMENTSOURCES_RECEIVED:
      return { ...state, payment_sources: payload };
    default:
      return { ...state };
  }
};
