import {
  HIDE_SPINNER,
  HIDE_SPINNER_DESCUENTO,
  SET_DESCUENTO,
  SET_DISCOUNT_CODE,
  SET_PAQUETE,
  SET_PAYMENT_SOURCE,
  SHOW_SPINNER,
  SHOW_SPINNER_DESCUENTO,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SET_PAQUETE:
      return { ...state, paquete: payload, product: payload };
    case SET_DESCUENTO:
      return {
        ...state,
        descuento: payload,
        discount: payload,
        spinnerDescuento: false,
      };
    case SET_PAYMENT_SOURCE: {
      return { ...state, payment_source_id: payload };
    }
    case SET_DISCOUNT_CODE:
      return { ...state, discountCode: payload };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    case SHOW_SPINNER_DESCUENTO:
      return { ...state, spinnerDescuento: true };
    case HIDE_SPINNER_DESCUENTO:
      return { ...state, spinnerDescuento: false };
    default:
      return { ...state };
  }
};
