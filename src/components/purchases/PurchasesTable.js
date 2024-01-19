import React, { useContext, useEffect } from "react";
import PurchaseCard from "./PurchaseCard";
import CancelForm from "./CancelForm";
import { ModalContext } from "../../context/ModalContext";
import { PurchasesContext } from "../../context/PurchasesContext";
import { setupTooltips } from "../../utils";
import useTranslations from "../../hooks/useTranslations";

const PurchasesTable = ({ purchases, showCustomer }) => {
  const { cancelSubscription } = useContext(PurchasesContext);
  const { modalComponent } = useContext(ModalContext);
  const translations = useTranslations();

  useEffect(() => {
    setupTooltips();
  }, [purchases]);

  const confirmCancel = (purchase) => {
    modalComponent(
      "Caution",
      <CancelForm purchase={purchase} cancelSubscription={cancelSubscription} />
    );
  };

  const renderOrdenes = () => {
    if (!purchases || purchases?.length <= 0) {
      return;
    }

    return purchases.map((purchase, index) => (
      <PurchaseCard
        purchase={purchase}
        key={index}
        showCustomer={showCustomer}
        cancelSubscription={confirmCancel}
      />
    ));
  };

  return (
    <div className="table-responsive purchases-table">
      {purchases && purchases.length <= 0 ? (
        <p>{translations.purchases.empty}</p>
      ) : (
        <table className="table">
          <thead>
            <tr className="bg-light border text-dark bold py-2">
              <th className="id">#ID</th>
              <th>Type</th>
              {showCustomer && <th>Customer</th>}
              <th>Product</th>
              <th>Status</th>
              <th className="datetime">Date</th>
              <th>Total</th>
              <th>Discount</th>
              <th className="datetime">Expires on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderOrdenes()}</tbody>
        </table>
      )}
    </div>
  );
};

export default PurchasesTable;
