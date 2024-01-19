import { navigate } from "@reach/router";
import React, { createContext, useContext, useReducer } from "react";
import CheckoutReducer from "../reducers/CheckoutReducer";
import CheckoutService from "../services/CheckoutService";
import {
  SET_PAQUETE,
  SHOW_SPINNER,
  HIDE_SPINNER,
  SET_DESCUENTO,
  SET_DISCOUNT_CODE,
  SET_PAYMENT_SOURCE,
  SHOW_SPINNER_DESCUENTO,
  HIDE_SPINNER_DESCUENTO,
} from "../types";
import { ModalContext } from "./ModalContext";
import ProductsService from "../services/ProductsService";
import DescuentosService from "../services/DescuentosService";
import {
  clearPayPalElement,
  removePayPalElement,
  importPayPalCheckout,
  importPayPalSubscriptions,
} from "../utils/paypal";

const initialState = {
  paquete: null,
  discountCode: "",
  product: null,
  payment_source_id: "card",
};

export const CheckoutContext = createContext(initialState);

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, initialState);

  const { alert, success } = useContext(ModalContext);

  const getSingleProduct = (product_id) => {
    ProductsService.getSingleProduct(product_id)
      .then((res) => {
        const { product } = res.data;
        dispatch({ type: SET_PAQUETE, payload: product });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert(
              "Lo sentimos, no encontramos el paquete que quieres comprar."
            );
          }
        }
        alert(error);
      });
  };

  const createOrder = ({
    type,
    product_id,
    invoice_id,
    discountCode,
    payment_method_id,
    payment_source_id,
    contract_invoice_id,
  }) => {
    dispatch({ type: SHOW_SPINNER });
    CheckoutService.postCheckout({
      type,
      product_id,
      invoice_id,
      discountCode,
      payment_method_id,
      payment_source_id,
      contract_invoice_id,
    })
      .then((res) => {
        dispatch({ type: HIDE_SPINNER });
        handleCheckoutSuccess(res);
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        handleCheckoutError(error);
      });
  };

  const handleCheckoutSuccess = (res) => {
    const { purchase_id } = res.data;
    navigate(`/thankyou/${purchase_id}`);
  };

  const handleCheckoutError = (error) => {
    let message = "There was an error processing your purchase.";
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        message = "You have not selected a valid payment method.";
      }
      if (status === 412) {
        message = "We're sorry, this product cannot be purchase anymore.";
      } else if (status === 409) {
        message = "We're sorry, you cannot purchase this product anymore.";
      }
    }
    return alert(message);
  };

  const setPaymentSource = (payment_source_id) => {
    dispatch({ type: SET_PAYMENT_SOURCE, payload: payment_source_id });
  };

  const setPayPal = ({
    product_id,
    discountCode,
    payment_method_id,
    payment_source_id,
  }) => {
    const payload = {
      product_id,
      discountCode,
      payment_method_id,
      payment_source_id,
    };
    clearPayPalElement("paypal-button");
    removePayPalElement("paypal-checkout");
    const script = importPayPalCheckout();
    script.onload = () => {
      window.paypal.Button.render(
        {
          env: "production",
          payment: (data, actions) =>
            CheckoutService.postPayPal(payload)
              .then((res) => {
                return res.data.orderID;
              })
              .catch(handleCheckoutError),
          onApprove: (data, actions) =>
            CheckoutService.capturePayPal({ ...payload, ...data }).then(
              function (res) {
                removePayPalElement("paypal-checkout");
                clearPayPalElement("paypal-button");
                navigate(`/thankyou/${data.purchase_id}`);
              }
            ),
        },
        "#paypal-button"
      );
    };
  };

  const showSpinner = () => {
    dispatch({ type: SHOW_SPINNER });
  };

  const hideSpinner = () => {
    dispatch({ type: HIDE_SPINNER });
  };

  const setDiscountCode = (code) => {
    dispatch({ type: SET_DISCOUNT_CODE, payload: code });
  };

  const setDescuento = (descuento) => {
    dispatch({ type: SET_DESCUENTO, payload: descuento });
  };

  const validarDescuento = (code, product_id) => {
    dispatch({ type: SHOW_SPINNER_DESCUENTO });
    DescuentosService.validarDescuento(code, product_id)
      .then((res) => {
        const { discount, error } = res.data;
        if (error) {
          alert(error.message);
        }
        dispatch({ type: SET_DESCUENTO, payload: discount });
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER_DESCUENTO });
        if (error.response) {
          if (error.response.status === 412) {
            return alert(
              "We're sorry, you cannot use this discount code anymore."
            );
          }
        }
        alert("We're sorry, that discount is invalid.");
      });
  };

  const setPayPalSubscription = (product_id, discountCode) => {
    removePayPalElement("paypal-subscription");
    const script = importPayPalSubscriptions();
    script.onload = (result) => {
      clearPayPalElement("paypal-button");
      window.paypal
        .Buttons({
          createSubscription: function (data, actions) {
            return CheckoutService.postPayPal(product_id, discountCode).then(
              (res) => {
                const { plan_id } = res.data;
                return actions.subscription.create({
                  plan_id,
                });
              }
            );
          },
          onApprove: function (data, actions) {
            return CheckoutService.capturePayPal({ ...data }).then((res) => {
              const { purchase_id } = res.data;
              removePayPalElement("paypal-subscription");
              navigate(`/thankyou/${purchase_id}`);
            });
          },
          onError: handleCheckoutError,
        })
        .render("#paypal-button");
    };
  };

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        setPayPal,
        createOrder,
        showSpinner,
        hideSpinner,
        setDescuento,
        setDiscountCode,
        setPaymentSource,
        validarDescuento,
        getSingleProduct,
        setPayPalSubscription,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
