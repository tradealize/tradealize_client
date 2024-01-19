import React, { createContext, useContext, useReducer } from "react";
import PaymentSourcesReducer from "../reducers/PaymentSourcesReducer";
import PaymentSourcesService from "../services/PaymentSourcesService";
import { PAYMENTSOURCES_RECEIVED } from "../types/payment_sources";
import { ModalContext } from "./ModalContext";

const initialState = {
  payment_sources: null,
};

export const PaymentSourcesContext = createContext(initialState);

export const PaymentSourcesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PaymentSourcesReducer, initialState);

  const { success, alert, clearModal } = useContext(ModalContext);

  const getPaymentSources = () => {
    PaymentSourcesService.getPaymentSources().then((res) => {
      const { payment_sources } = res.data;
      dispatch({ type: PAYMENTSOURCES_RECEIVED, payload: payment_sources });
    });
  };

  const postPaymentSource = (payment_source, callback) => {
    PaymentSourcesService.postPaymentSource(payment_source).then((res) => {
      payment_source = res.data.payment_source;
      success("Método de pago guardado.");
      if (typeof callback === "function") {
        callback(payment_source.payment_source_id);
      }
      getPaymentSources();
      clearModal();
    });
  };

  const deletePaymentSource = (payment_source_id) => {
    PaymentSourcesService.deletePaymentSource(payment_source_id)
      .then(() => {
        success("PaymentSource de Pago eliminado con éxito.");
        getPaymentSources();
        clearModal();
      })
      .catch(() => {
        alert("Hubo un error al agregar este método de pago.");
      });
  };

  return (
    <PaymentSourcesContext.Provider
      value={{
        ...state,
        getPaymentSources,
        deletePaymentSource,
        postPaymentSource,
      }}
    >
      {children}
    </PaymentSourcesContext.Provider>
  );
};
