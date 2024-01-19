import { HIDE_SPINNER, SHOW_SPINNER } from "../types";
import {
  INVOICES_RECIBIDOS,
  PURCHASES_RECIBIDAS,
  SET_PURCHASE,
  SET_INVOICE,
  SET_PAYMENT_NEEDED,
  SET_PROPERTY_PURCHASE,
} from "../types/purchases";

const PurchasesReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_PAYMENT_NEEDED:
      return { ...state, payment_needed: payload };
    case PURCHASES_RECIBIDAS:
      return { ...state, purchases: payload };
    case SET_PROPERTY_PURCHASE: {
      const purchase = { ...state.purchase };
      const { key, value } = payload;
      purchase[key] = value;
      return { ...state, purchase };
    }
    case SET_PURCHASE:
      return { ...state, purchase: payload };
    case SET_INVOICE:
      return { ...state, invoice: payload };
    case INVOICES_RECIBIDOS:
      return { ...state, invoices: payload };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    default:
      return { ...state };
  }
};

export default PurchasesReducer;
