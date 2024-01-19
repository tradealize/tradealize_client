import React, { useContext, useEffect } from "react";
import moment from "moment";
import { Link } from "@reach/router";
import { AuthContext } from "../context/AuthContext";
import StatusBadge from "../components/global/StatusBadge";
import { PurchasesContext } from "../context/PurchasesContext";

const ThankYou = ({ purchase_id }) => {
  const { user, getCurrentUser } = useContext(AuthContext);
  const { purchase, getSinglePurchase } = useContext(PurchasesContext);

  useEffect(() => {
    if (user !== null) {
      let purchaseInterval = setInterval(() => {
        getSinglePurchase(purchase_id);
        getCurrentUser();
      }, 2000);
      return () => {
        clearInterval(purchaseInterval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const renderPurchase = () => {
    if (purchase && purchase !== null) {
      return (
        <div
          className="card p-3 shadow d-block m-auto"
          style={{ maxWidth: 500 }}
        >
          <h1>Order Summary</h1>
          <h4>Order #{purchase.purchase_id}</h4>
          <p>Date: {moment(purchase.createdAt).format("DD MMM YYYY HH:mm")}</p>
          <p>Total: ${purchase.amount} USD</p>
          <p>
            Status:{" "}
            <StatusBadge
              status={purchase.status}
              order_id={purchase.payment_processor_id}
            />
          </p>
          <Link to="/" className="btn btn-primary w-100">
            OK
          </Link>
        </div>
      );
    }
    return <div className="spinner-border"></div>;
  };

  return (
    <div className="container-fluid py-4">
      <div className="container">{renderPurchase()}</div>
    </div>
  );
};

export default ThankYou;
