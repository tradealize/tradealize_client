import React, { createContext, useContext, useReducer } from "react";
import PurchasesReducer from "../reducers/PurchasesReducer";
import PurchasesService from "../services/PurchasesService";
import InvoicesService from "../services/InvoicesService";
import {
  PURCHASES_RECIBIDAS,
  INVOICES_RECIBIDOS,
  SET_PURCHASE,
  SET_INVOICE,
  SET_PAYMENT_NEEDED,
  SET_PROPERTY_PURCHASE
} from "../types/purchases";
import { ModalContext } from "./ModalContext";
import { HIDE_SPINNER, SHOW_SPINNER } from "../types";
import { CustomerContext } from "./CustomerContext";

const initialState = {
  payment_needed: false,
  purchases: [],
  purchase: null,
  invoices: null,
};


export const PurchasesContext = createContext(initialState);


export const PurchasesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PurchasesReducer, initialState);

  const { getSingleCustomer } = useContext(CustomerContext);
  const { clearModal, success } = useContext(ModalContext);

  const setPaymentNeeded = (payload) => {
    dispatch({ type: SET_PAYMENT_NEEDED, payload });
  };

  const setPurchase = (purchase) => {
    dispatch({ type: SET_PURCHASE, payload: purchase });
  };

  const getSinglePurchase = (purchase_id) => {
    PurchasesService.getSinglePurchase(purchase_id).then((res) => {
      const { purchase } = res.data;
      dispatch({ type: SET_PURCHASE, payload: purchase });
    });
  };

  const getPurchases = () => {
    PurchasesService.getPurchases().then((res) => {
      const { purchases } = res.data;
      dispatch({ type: PURCHASES_RECIBIDAS, payload: purchases });
    });
  };

  const getPurchasesAdmin = (filters) => {
    dispatch({ type: SHOW_SPINNER });
    PurchasesService.getPurchasesAdmin(filters).then((res) => {
      const { purchases } = res.data;
      dispatch({ type: PURCHASES_RECIBIDAS, payload: purchases });
    }).finally(dispatch({ type: HIDE_SPINNER }));
  };

  const getInvoices = () => {
    InvoicesService.getInvoices().then((res) => {
      const { invoices } = res.data;
      dispatch({ type: INVOICES_RECIBIDOS, payload: invoices });
    });
  };

  const getPurchase = (purchase_id) => {
    PurchasesService.getPurchase(purchase_id).then((res) => {
      const { purchase } = res.data;
      dispatch({ type: SET_PURCHASE, payload: purchase });
    });
  };

  const getInvoice = (invoice_id) => {
    InvoicesService.getSingleInvoice(invoice_id).then((res) => {
      const { invoice } = res.data;
      dispatch({ type: SET_INVOICE, payload: invoice });
    });
  };

  const cancelSubscription = (purchase, reason) => {
    PurchasesService.cancelSubscription(purchase.purchase_id, reason).then((res) => {
      setTimeout(getPurchases, 1500);
      getPurchases();
      clearModal();
    }).finally(() => getSingleCustomer(purchase.user_id));
  };

  const setPropertyPurchase = (key, value) => {
    dispatch({ type: SET_PROPERTY_PURCHASE, payload: { key, value } });
  };

  const updatePurchase = (purchase) => {
    PurchasesService.updatePurchase(purchase)
      .then(() => {
        success("Compra actualizada con éxito");
        getSingleCustomer(purchase.user_id);
        clearModal();
      })
      .catch(alert);
  };


  return (
    <PurchasesContext.Provider
      value={{
        ...state,
        updatePurchase,
        setPropertyPurchase,
        getInvoice,
        getInvoices,
        getPurchase,
        getPurchases,
        getPurchasesAdmin,
        setPaymentNeeded,
        setPurchase,
        getSinglePurchase,
        cancelSubscription,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};
