import React, { useContext, useEffect } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import { PaymentSourcesContext } from "../../context/PaymentSourcesContext";
import { AuthContext } from "../../context/AuthContext";
import PaymentMethodCard from "../paymentMethods/PaymentMethodCard";
import PaymentSource from "../payment_sources/PaymentSource";
import StripeCheckout from "../common/StripeCheckout";

const CheckoutPaymentMethods = ({
  product_id,
  paymentMethod,
  setPaymentMethod,
  handleSubmitCheckout,
}) => {
  const { spinner, discountCode } = useContext(CheckoutContext);
  const { user } = useContext(AuthContext);

  const { payment_sources, getPaymentSources } = useContext(
    PaymentSourcesContext
  );

  useEffect(() => {
    if (user !== null) {
      getPaymentSources();
    }
  }, [user]);

  const renderPaymentSources = () => {
    if (payment_sources && payment_sources !== null) {
      return payment_sources.map((metodo) => (
        <PaymentSource
          key={metodo.payment_source_id}
          payment_source={metodo}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      ));
    }
  };

  const renderPago = () => {
    if (user !== null) {
      return (
        <div className="oveflow-hidden">
          <h2>Payment Method</h2>
          {renderPaymentSources()}
          <PaymentMethodCard
            name="card"
            label="Credit or Debit Card"
            selected={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          >
            {paymentMethod === "card" && (
              <StripeCheckout
                element_id={product_id}
                discountCode={discountCode}
              />
            )}
          </PaymentMethodCard>
          {/*<PaymentMethodCard
            name="paypal"
            label="PayPal"
            description="Se te cobrará un 6% de comisión"
            selected={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          >
            <div
              id="paypal-button"
              className="mt-2"
              style={{
                display: paymentMethod === "paypal" ? "block" : "none",
              }}
            ></div>
            </PaymentMethodCard>*/}
          <div className="container-fluid px-0 text-right">
            {!["paypal", "card"].includes(paymentMethod) && (
              <button
                onClick={() => handleSubmitCheckout(paymentMethod)}
                className="btn btn-primary btn-lg"
                disabled={spinner}
              >
                {spinner ? <div className="spinner-border"></div> : "Pay Now"}
              </button>
            )}
          </div>
        </div>
      );
    }
  };

  return <div>{renderPago()}</div>;
};

export default CheckoutPaymentMethods;
