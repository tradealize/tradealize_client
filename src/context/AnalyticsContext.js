import React, { createContext, useReducer } from "react";
import AnalyticsReducer from "../reducers/AnalyticsReducer";
import AnalyticsService from "../services/AnalyticsService";
import {
  INSCRITOS_RECIBIDOS,
  INGRESOS_RECIBIDOS,
  PRODUCTOS_PURCHASES_RECIBIDOS,
} from "../types/analytics";

const initialState = {
  cancelled: [],
  customers: [],
  signups: [],
};

export const AnalyticsContext = createContext(initialState);

export const AnalyticsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AnalyticsReducer, initialState);

  const getSignUps = (start_date, end_date) => {
    AnalyticsService.getInscritos(start_date, end_date).then((res) => {
      dispatch({ type: INSCRITOS_RECIBIDOS, payload: res.data });
    });
  };

  const getPurchases = (start_date, end_date) => {
    AnalyticsService.getPurchases(start_date, end_date).then((res) => {
      dispatch({ type: PRODUCTOS_PURCHASES_RECIBIDOS, payload: res.data });
    });
  };

  const getIngresos = (start_date, end_date) => {
    AnalyticsService.getIngresos(start_date, end_date).then((res) => {
      dispatch({ type: INGRESOS_RECIBIDOS, payload: res.data });
    });
  };

  return (
    <AnalyticsContext.Provider
      value={{
        ...state,
        getPurchases,
        getIngresos,
        getSignUps,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
