import React, { useReducer, createContext } from "react";
import InvoicesReducer from "../reducers/InvoicesReducer";
import InvoicesService from "../services/InvoicesService";
import { INVOICES_RECEIVED } from "../types/invoices";
import {
  HIDE_SPINNER,
  SHOW_SPINNER,
  CREATE_INVOICE,
  SET_PROPERTY_INVOICE,
  SET_INVOICE,
} from "../types";
import { CustomerContext } from "./CustomerContext";
import { hideModal } from "../utils";
import { useContext } from "react";
import { ModalContext } from "./ModalContext";

const initialState = {
  invoices: [],
  invoice: null,
};

export const InvoicesContext = createContext(initialState);

export const InvoicesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(InvoicesReducer, initialState);

  const { getSingleCustomer } = useContext(CustomerContext);
  const { success } = useContext(ModalContext);

  const createInvoice = () => {
    dispatch({ type: CREATE_INVOICE });
  };

  const clearInvoice = () => {
    dispatch({ type: SET_INVOICE, payload: null });
  };

  const setPropertyInvoice = (key, value) => {
    dispatch({ type: SET_PROPERTY_INVOICE, payload: { key, value } });
  };

  const setInvoice = (invoice) => {
    dispatch({ type: SET_INVOICE, payload: invoice });
  };

  const getInvoices = (filters) => {
    dispatch({ type: SHOW_SPINNER });
    InvoicesService.getInvoices(filters)
      .then((res) => {
        const { invoices } = res.data;
        dispatch({ type: INVOICES_RECEIVED, payload: invoices });
      })
      .finally(dispatch({ type: HIDE_SPINNER }));
  };

  const postInvoice = (invoice) => {
    let service = InvoicesService.putInvoice;
    if (isNaN(invoice.invoice_id)) {
      service = InvoicesService.postInvoice;
    }
    service(invoice).then(() => {
      getSingleCustomer(invoice.user_id);
      success("Cargo guardado.");
      hideModal();
    });
  };

  return (
    <InvoicesContext.Provider
      value={{
        ...state,
        getInvoices,
        createInvoice,
        setPropertyInvoice,
        postInvoice,
        setInvoice,
        clearInvoice,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};
