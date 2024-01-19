import React from "react";
import mastercard from "../../assets/images/payment-method-mc.png";
import visa from "../../assets/images/payment-method-visa.png";
import amex from "../../assets/images/payment-method-amex.png";

const PaymentSource = ({
  hideButton,
  payment_source,
  setPaymentMethod,
  paymentMethod,
}) => {
  const { payment_source_id, card_type, last_digits } = payment_source;

  const handleClick = () => {
    if (typeof setPaymentMethod === "function") {
      setPaymentMethod(payment_source_id);
    }
  };

  return (
    <div
      className={`card p-3 mb-3 ${
        paymentMethod === payment_source_id ? "border-primary" : ""
      }`}
      onClick={handleClick}
    >
      <div className="row">
        {!hideButton && (
          <div className="col-1">
            <input type="radio" checked={paymentMethod === payment_source_id} />
          </div>
        )}
        <div className="col-11">
          <div className="row align-items-center">
            <div className="col col-md-4">
              <img
                src={
                  card_type === "mastercard"
                    ? mastercard
                    : card_type === "visa"
                    ? visa
                    : amex
                }
                className="card-type"
                alt="card type"
              />
            </div>
            <div className="col col-md-4 capitalize">{card_type}</div>
            <div className="col col-md-4">
              {"**** "}
              {last_digits}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSource;
