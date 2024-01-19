import {
  INSCRITOS_RECIBIDOS,
  INGRESOS_RECIBIDOS as INGRESOS_RECIBIDOS,
  PRODUCTOS_PURCHASES_RECIBIDOS,
} from "../types/analytics";

const AnalyticsReducer = (state, { type, payload }) => {
  switch (type) {
    case INSCRITOS_RECIBIDOS:
      return { ...state, ...payload };
    case PRODUCTOS_PURCHASES_RECIBIDOS:
      return { ...state, ...payload };
    case INGRESOS_RECIBIDOS:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default AnalyticsReducer;
