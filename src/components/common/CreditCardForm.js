import React from "react";
import CreditCardInput from "react-credit-card-input";

const CreditCardForm = ({ modifier, name, number, expiry, cvc }) => {
  return (
    <div>
      <CreditCardInput
        cardNumberInputProps={{
          value: number,
          onChange: (e) => modifier("number", e.target.value),
        }}
        cardExpiryInputProps={{
          value: expiry,
          onChange: (e) => modifier("expiry", e.target.value),
        }}
        cardCVCInputProps={{
          value: cvc,
          onChange: (e) => modifier("cvc", e.target.value),
        }}
        fieldClassName="input"
      />
      <label className="d-block mt-2">Nombre en la Tarjeta</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Nombre en la Tarjeta"
        style={{ maxWidth: 409 }}
        value={name}
        onChange={(e) => modifier("name", e.target.value)}
      />
    </div>
  );
};

export default CreditCardForm;
