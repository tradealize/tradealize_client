import React, { useContext, useEffect } from "react";
import { CheckoutContext } from "../../context/CheckoutContext";
import { formatMonto, S3_ENDPOINT } from "../../utils";
import moment from "moment";

const CheckoutItem = ({ product_id }) => {
  const { product, descuento, getSingleProduct } = useContext(CheckoutContext);

  useEffect(() => {
    getSingleProduct(product_id);
  }, []);

  const renderNextBilling = () => {
    return (
      <span className="small d-block">
        Starting on{" "}
        {moment()
          .add(product.subscription_interval, product.subscription_period)
          .format("MMM Do YYYY")}
      </span>
    );
  };

  const renderBillingPeriod = () => {
    return `each 
              ${
                product.subscription_interval !== 1
                  ? product.subscription_interval + " "
                  : ""
              }
              ${product.subscription_period}`;
  };

  const renderResultadoDescuento = () => {
    if (descuento && descuento !== null) {
      let total = product.price;
      if (descuento.is_percent) {
        let porcentaje = parseFloat(1 - descuento.amount / 100);
        total = parseFloat(product.price) * porcentaje;
      } else {
        total = product.price - descuento.amount;
      }
      total = parseFloat(total).toFixed(2);
      return (
        <div className="container-fluid px-0">
          <h5 className="text-primary">
            Discounted Total: {"$"}
            {total} USD
          </h5>
          {descuento.first_invoice_only && (
            <p>
              Then ${formatMonto(product.price)} {renderBillingPeriod()}{" "}
              {renderNextBilling()}
            </p>
          )}
        </div>
      );
    }
  };

  const renderImage = () => {
    if (product.thumbnail !== null && product.image !== null) {
      return (
        <img
          src={`${S3_ENDPOINT}/${product.image.name}.${product.image.type}`}
          className="class-package-thumbnail mb-3"
        />
      );
    }
  };

  const renderWords = () => {
    if (product.word_amount === null) {
      return <p>Unlimited words!</p>;
    }
    return (
      <p>
        {formatMonto(product.word_amount)} words {renderBillingPeriod()}
      </p>
    );
  };

  const renderProduct = () => {
    if (product && product !== null) {
      const price =
        product.sale_price !== null && product.sale_price !== ""
          ? product.sale_price
          : product.price;
      return (
        <div>
          {renderImage()}
          <h3>{product.title}</h3>
          <h4>{product.name}</h4>
          <h3 className="h5">
            Total: {"$"}
            {formatMonto(price)}
            {" USD"} {renderBillingPeriod()}
          </h3>
          {renderWords()}
          {renderResultadoDescuento()}
        </div>
      );
    }
  };

  return (
    <div>
      <h4>You're Paying</h4>
      <div className="mb-3 card p-3">{renderProduct()}</div>
    </div>
  );
};

export default CheckoutItem;
