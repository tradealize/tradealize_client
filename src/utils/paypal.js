const paypal_dev_key =
  "AdZEW5Ru6MrKRVBoQ_8KPIUPB_832eOzEOpMOKY4VoDI8qh-7NqLqF-NNiF4DZeymBUaDynLVs0Mu6ao";

const paypal_live_key =
  "AdZEW5Ru6MrKRVBoQ_8KPIUPB_832eOzEOpMOKY4VoDI8qh-7NqLqF-NNiF4DZeymBUaDynLVs0Mu6ao";

const paypal_client_id =
  process.env.NODE_ENV === "development" ? paypal_dev_key : paypal_live_key;

const PAYPAL_URL = `https://www.paypal.com/sdk/js?client-id=${paypal_client_id}&vault=true&intent=subscription`;

export const importPayPalCheckout = () => {
  const script = document.createElement("script");
  script.src = "https://www.paypalobjects.com/api/checkout.js";
  script.id = "paypal-checkout";
  document.body.appendChild(script);
  return script;
};

export const importPayPalSubscriptions = () => {
  const script = document.createElement("script");
  script.src = PAYPAL_URL;
  script.id = "paypal-subscription";
  document.body.appendChild(script);
  return script;
};

export const clearPayPalElement = (elementId) => {
  const paypalButton = document.getElementById(elementId);
  if (paypalButton.innerHTML !== "") {
    paypalButton.innerHTML = "";
  }
};
export const removePayPalElement = (elementId) => {
  const paypalCheckout = document.getElementById(elementId);
  if (paypalCheckout !== null) {
    paypalCheckout.remove();
  }
};
