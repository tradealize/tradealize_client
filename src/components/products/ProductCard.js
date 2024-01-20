import React from "react";
import { formatMonto } from "../../utils";
import { Link } from "@reach/router";

const ProductCard = ({ product, isHome }) => {
  const renderBillingPeriod = () => {
    return `each 
              ${
                product.subscription_interval !== 1
                  ? product.subscription_interval + " "
                  : ""
              }
              ${product.subscription_period}`;
  };

  return (
    <div
      className={`card shadow mb-3 ${
        isHome ? "bg-black text-white" : "bg-white"
      }`}
    >
      <div
        className={`card-header border-0 pt-4 ${
          isHome ? "bg-black text-white" : "bg-white"
        }`}
      >
        <h4 className={`${isHome ? "text-white" : "text-dark"}`}>
          {product.name}
        </h4>
        <p className={`${isHome ? "text-white" : "text-dark"}`}>
          {product.short_description}
        </p>
      </div>
      <div className="card-body pt-0">
        <h3
          className={`bold text-gradient ${
            isHome ? "text-white" : "text-dark"
          }`}
        >
          ${formatMonto(product.price)}{" "}
          <span
            className={`${isHome ? "text-white" : "text-muted"}`}
            style={{ fontWeight: 400 }}
          >
            USD / mo
          </span>
        </h3>
        {product.word_amount === null ? (
          <p className="text-primary">Unlimited words!</p>
        ) : (
          <p className={`${isHome ? "text-white" : "text-dark"}`}>
            {formatMonto(product.word_amount)} words {renderBillingPeriod()}
          </p>
        )}
        <hr />
        <h4
          className={`h6 ${isHome ? "text-white" : "text-dark"}`}
          style={{ fontWeight: 600 }}
        >
          What's Included?
        </h4>
        <ul style={{ listStyleType: "none", marginLeft: 0, paddingLeft: 0 }}>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>
            Trending Topics Generator
          </li>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>Trending Hashtag
            Generator
          </li>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>Fetch Content
            Research & Generator
          </li>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>Access to
            Community
          </li>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>Step-by-Step Video
            Tutorials
          </li>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>Create Content in
            Spanish & English
          </li>
          <li className={`${isHome ? "text-white" : "text-dark"}`}>
            <i className="fa fa-check me-2 text-gradient"></i>Secure storage.
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <Link
          to={`/checkout/${product.product_id}`}
          className="btn my-3 btn-primary w-100"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
