import React, { useContext, useEffect } from "react";
import { CheckoutContext } from "../context/CheckoutContext";
import CheckoutItem from "../components/checkout/CheckoutItem";
import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CheckoutFooter from "../components/checkout/CheckoutFooter";
import CheckoutPaymentMethods from "../components/checkout/CheckoutPaymentMethods";
import CheckoutAccount from "../components/checkout/CheckoutAccount";
import { AuthContext } from "../context/AuthContext";
import CheckoutDiscount from "../components/checkout/CheckoutDiscount";
import { ModalContext } from "../context/ModalContext";
import { navigate } from "@reach/router";

const Checkout = ({ product_id }) => {
  const { confirm, clearModal } = useContext(ModalContext);
  const { user, getCurrentUser } = useContext(AuthContext);
  //Checkout
  const {
    createOrder,
    setDescuento,
    discountCode,
    setPaymentSource,
    payment_source_id,
  } = useContext(CheckoutContext);

  useEffect(() => {
    return () => {
      getCurrentUser();
      setDescuento(null);
    };
  }, []);

  useEffect(() => {
    if (user && user !== null) {
      const { purchase } = user;
      if (purchase && purchase !== null) {
        if (
          purchase.status === "active" &&
          (purchase.product_id > product_id || purchase.product_id === 1)
        ) {
          return confirm(
            `You already have an active subscription to the ${purchase.product.name} plan, which offers more benefits. If you continue with this new purchase, you will be downgrading your subscription. Are you sure you want to proceed?`,
            clearModal,
            () => navigate("/")
          );
        }
        if (
          purchase.status === "active" &&
          parseInt(purchase.product_id) === parseInt(product_id)
        ) {
          return confirm(
            `You already have an active subscription to the ${purchase.product.name} plan.`,
            () => {
              clearModal();
              navigate("/");
            },
            () => {
              clearModal();
              navigate("/");
            }
          );
        }
      }
    }
  }, [user]);

  const handleSubmit = (payment_source_id) => {
    const payload = {
      product_id,
      discountCode,
      payment_source_id,
      payment_method_id: 1,
    };
    createOrder(payload);
  };

  return (
    <div id="checkout" className="container-fluid px-0">
      <CheckoutHeader />
      <div className="checkout-content container">
        <div className="row pt-4 pb-5">
          <div className="col-12 col-md-4 my-2">
            <CheckoutItem product_id={product_id} />
            <CheckoutDiscount product_id={product_id} />
          </div>
          <div className="col-12 col-md-8 my-2">
            <CheckoutAccount />
            {user !== null && (
              <CheckoutPaymentMethods
                product_id={product_id}
                paymentMethod={payment_source_id}
                setPaymentMethod={setPaymentSource}
                handleSubmitCheckout={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Checkout;
