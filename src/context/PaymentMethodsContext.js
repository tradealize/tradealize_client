import React, { createContext, useReducer } from "react";
import PaymentMethodsReducer from "../reducers/PaymentMethodsReducer";
import PaymentMethodService from "../services/PaymentMethodService";
import { PAYMENT_METHODS_RECIBIDOS } from "../types";

const initialState = {
  payment_methods: null,
};

export const PaymentMethodsContext = createContext(initialState);

export const PaymentMethodsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PaymentMethodsReducer, initialState);
  const getPaymentMethods = () => {
    PaymentMethodService.getPaymentMethods().then((res) => {
      const { payment_methods } = res.data;
      dispatch({ type: PAYMENT_METHODS_RECIBIDOS, payload: payment_methods });
    });
  };
  return (
    <PaymentMethodsContext.Provider value={{ ...state, getPaymentMethods }}>
      {children}
    </PaymentMethodsContext.Provider>
  );
};
