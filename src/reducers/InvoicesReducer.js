import {
  SET_INVOICE,
  HIDE_SPINNER,
  SHOW_SPINNER,
  CLEAR_INVOICES,
  CREATE_INVOICE,
  INVOICES_RECEIVED,
  SET_PROPERTY_INVOICE,
} from "../types";

const schema = {
  invoice_id: "nuevo",
  purchase_id: null,
  status: "pending",
  user_id: null,
  amount: 0,
  payment_method_id: null,
};

const InvoicesReducer = (state, { type, payload }) => {
  switch (type) {
    case CLEAR_INVOICES:
      return { ...state, invoices: null };
    case SET_INVOICE:
      return { ...state, invoice: payload };
    case CREATE_INVOICE:
      return { ...state, invoice: schema };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    case SET_PROPERTY_INVOICE: {
      const { key, value } = payload;
      const invoice = { ...state.invoice };
      invoice[key] = value;
      return { ...state, invoice };
    }
    case INVOICES_RECEIVED:
      return { ...state, invoices: payload };
    case SHOW_SPINNER:
      return { ...state, spinner: true };
    case HIDE_SPINNER:
      return { ...state, spinner: false };
    default:
      return { ...state };
  }
};
export default InvoicesReducer;
