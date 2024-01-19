import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CheckoutService from "../../services/CheckoutService";
import { ModalContext } from "../../context/ModalContext";
import { AuthContext } from "../../context/AuthContext";
import { navigate } from "@reach/router";
import { cardStyle } from "../../utils";

const StripeCreditCard = ({ element_id, discountCode }) => {
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  const { user } = useContext(AuthContext);

  const { alert } = useContext(ModalContext);

  const handleError = (message) => {
    setProcessing(false);
    alert(`There was an error processing your purchase: ${message}`);
  };

  const handleSuccess = (purchase_id) => {
    setProcessing(false);
    navigate(`/thankyou/${purchase_id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const card = elements.getElement(CardElement);
    const payment_method = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user.email,
      },
    });
    CheckoutService.postCheckout({
      product_id: element_id,
      payment_method_id: 1,
      payment_method,
      discountCode,
    })
      .then(async (res) => {
        const { clientSecret, purchase_id } = res.data;
        if (clientSecret) {
          const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card,
            },
          });
          if (payload.error) {
            handleError(payload.error.message);
          } else {
            handleSuccess(purchase_id);
          }
        } else {
          handleSuccess(purchase_id);
        }
      })
      .catch((error) => {
        setProcessing(false);
        let message =
          "We're sorry, there was an error processing your purchase.";
        if (error.response) {
          if (error.response.status === 402) {
            message =
              "We're sorry, your was declined due to insufficient funds.";
          } else {
            message =
              "We're sorry, your card was rejected, please try another payment method.";
          }
        }
        return alert(message);
      });
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
  };

  return (
    <div className="container-fluid px-0">
      <form onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
          className="form-control pt-2 my-2"
        />
        <button
          className="btn btn-primary bold mt-2"
          disabled={processing || disabled}
        >
          {processing ? <div className="spinner-border"></div> : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default StripeCreditCard;
