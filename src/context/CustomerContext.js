import React, { createContext, useReducer, useContext } from "react";
import UserService from "../services/UserService";
import CustomerReducer from "../reducers/CustomersReducer";
import CustomerService from "../services/CustomerService";

import {
  CUSTOMERS_RECEIVED,
  SET_CUSTOMER,
  CREATE_CUSTOMER,
  SET_CUSTOMER_PROPERTY,
  RECEIVED_LINK,
} from "../types/customers";
import { SHOW_SPINNER, HIDE_SPINNER } from "../types";
import { ModalContext } from "./ModalContext";
import { navigate } from "@reach/router";
import { AuthContext } from "./AuthContext";

const initialState = {
  customers: [],
  customer: {},
};


export const CustomerContext = createContext(initialState);

export const CustomersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CustomerReducer, initialState);

  const { alert, success, hideModal, clearModal } = useContext(ModalContext);
  const { recoverPassword } = useContext(AuthContext)

  const getAllCustomers = (filters) => {
    UserService.getAllUsers(filters)
      .then((response) => {
        const { users } = response.data;
        dispatch({ type: CUSTOMERS_RECEIVED, payload: users });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getSingleCustomer = (customer_id) => {
    UserService.getSingleUser(customer_id)
      .then((response) => {
        const { user } = response.data;
        dispatch({ type: SET_CUSTOMER, payload: user });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteCustomer = (customer_id) => {
    UserService.deleteUser(customer_id).then((res) => {
      navigate("/admin/users");
      success("Cliente eliminado con éxito.");
      hideModal();
    });
  };

  const setCustomer = (customer) => {
    dispatch({ type: SET_CUSTOMER, payload: customer });
  };

  const createCustomer = () => {
    dispatch({ type: CREATE_CUSTOMER });
  };

  const setCustomerProperty = (key, value) => {
    dispatch({ type: SET_CUSTOMER_PROPERTY, payload: { key, value } });
  };

  const extenderAcceso = (purchaseData) => {
    CustomerService.extenderAcceso(purchaseData).then(() => {
      success("¡Acceso agregado!");
      getSingleCustomer(purchaseData.user_id);
      clearModal();
    });
  };

  const getPasswordResetLink = (email) => {
    CustomerService.getPasswordResetLink(email).then((res) => {
      const { link } = res.data;
      dispatch({ type: RECEIVED_LINK, payload: link });
    });
  };

  const createUserNoSignUp = (customer) => {
    dispatch({ type: SHOW_SPINNER });
    const handleSuccess = ({ data }) => {
      success("Cliente guardado con éxito.");
      dispatch({ type: HIDE_SPINNER });
      const { user } = data
      recoverPassword(user.email)
    };

    const handleError = (error) => {
      alert(error);
      dispatch({ type: HIDE_SPINNER });
    };

    if (isNaN(customer.customer_id)) {
      CustomerService.createUserNoSignUp(customer)
        .then(handleSuccess)
        .catch(handleError);
    } else {
      CustomerService.putCustomer(customer)
        .then(handleSuccess)
        .catch(handleError);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        ...state,
        setCustomer,
        getAllCustomers,
        getSingleCustomer,
        deleteCustomer,
        extenderAcceso,
        createCustomer,
        createUserNoSignUp,
        setCustomerProperty,
        getPasswordResetLink,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
