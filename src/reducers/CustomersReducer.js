
import {
  SET_CUSTOMER,
  CUSTOMERS_RECEIVED,
  CREATE_CUSTOMER,
  SET_CUSTOMER_PROPERTY,
  RECEIVED_LINK
} from "../types/customers";

const schema = {
  customer_id: "nuevo",
  name: "",
  last_name: "",
  email: "",
  phone: "",
  instagram: "",
  signup_reason: "",
};

const customersReducer = (state, { type, payload }) => {
  switch (type) {
    case CUSTOMERS_RECEIVED:
      return { ...state, customers: payload };
    case SET_CUSTOMER:
      return { ...state, customer: payload };
    case CREATE_CUSTOMER:
      return { ...state, customer: schema };
    case SET_CUSTOMER_PROPERTY:
      const customer = { ...state.customer };
      const { key, value } = payload;
      customer[key] = value;
      return { ...state, customer };
    case RECEIVED_LINK: {
      return { ...state, link: payload };
    }
    default:
      return { ...state };
  }
};

export default customersReducer;
