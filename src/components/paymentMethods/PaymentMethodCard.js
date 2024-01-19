import React from "react";

const PaymentMethodCard = ({
  name,
  label,
  children,
  selected,
  description,
  setPaymentMethod,
}) => {
  return (
    <div
      className={`card p-3 mb-3 payment-method-card ${
        selected === name ? "border-primary" : ""
      }`}
      onClick={() => setPaymentMethod(name)}
    >
      <div className="row mb-1 align-items-center">
        <div className="col-1">
          <input type="radio" checked={selected === name} />
        </div>
        <div className="col-11">
          <label className="mb-0">{label}</label>
        </div>
      </div>
      {description && <p className="mb-0">{description}</p>}
      {children}
    </div>
  );
};

export default PaymentMethodCard;
