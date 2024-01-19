import React, { useContext } from "react";
import { formatMonto } from "../../utils";
import moment from "moment";
import StatusBadge from "../global/StatusBadge";
import { Link } from "@reach/router";
import { PurchasesContext } from "../../context/PurchasesContext";
import { ModalContext } from "../../context/ModalContext";
import EditPurchaseForm from "./EditPurchaseForm";
import useTranslations from "../../hooks/useTranslations";

const PurchaseCard = ({ purchase, showCustomer, cancelSubscription }) => {
  const { setPurchase } = useContext(PurchasesContext);
  const { formatDateTime } = useTranslations();
  const { clearModal, modalComponent } = useContext(ModalContext);

  const handleCancel = () => {
    clearModal();
    setPurchase(null);
  };

  const canCancel = () => {
    if (
      !showCustomer &&
      purchase.status === "active" &&
      typeof cancelSubscription === "function"
    ) {
      return (
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Cancel Subscription"
          className="btn btn-round btn-sm btn-outline-danger"
          onClick={() => cancelSubscription(purchase)}
        >
          <i className="fa fa-times"></i>
        </button>
      );
    }
  };

  const handleEdit = () => {
    setPurchase(purchase);
    modalComponent(
      "Editar Compra",
      <EditPurchaseForm handleCancel={handleCancel} />
    );
  };

  const renderDiscount = () => {
    if (purchase.discount && purchase.discount !== null) {
      return purchase.discount.code;
    }
  };

  const renderExpiration = () => {
    if (purchase.expiration_date && purchase.expiration_date !== null) {
      return formatDateTime(purchase.expiration_date);
    }
    if (purchase.subscription_id !== null && purchase.status === "cancelled") {
      let free_trial_cancel = moment(purchase.createdAt);
      if (purchase.free_trial_length !== null) {
        free_trial_cancel.add(purchase.free_trial_length, "days");
      }
      let cancel_expiration = moment(purchase.updatedAt).add(
        purchase.subscription_interval,
        purchase.subscription_period
      );
      let expiration_date = cancel_expiration;
      if (free_trial_cancel.isAfter(cancel_expiration)) {
        expiration_date = free_trial_cancel;
      }
      return formatDateTime(expiration_date);
    }
    let expiration_date = moment(purchase.createdAt);
    if (purchase.free_trial_length !== null) {
      expiration_date.add(purchase.free_trial_length, "days");
    }
    return formatDateTime(
      expiration_date.add(
        purchase.subscription_interval,
        purchase.subscription_period
      )
    );
  };

  const renderCustomer = () => {
    const customer = purchase.invoice_id
      ? purchase.purchase.user
      : purchase.user;

    if (showCustomer && customer && customer !== null) {
      return (
        <td>
          <Link to={`users/${customer.user_id}/`}>
            <i className="fa fa-eye me-3"></i>
            {customer.name}: {customer.email}
          </Link>
        </td>
      );
    }
  };

  const renderType = () => {
    return purchase.invoice_id ? "Invoice" : "Purchase";
  };

  const renderProduct = () => {
    return purchase.invoice_id
      ? purchase.purchase.product?.name
      : purchase.product?.name;
  };

  return (
    <tr className="border text-dark">
      <td className="id">
        {purchase.invoice_id ? purchase.invoice_id : purchase.purchase_id}
      </td>
      <td>{renderType()}</td>
      {renderCustomer()}
      <td>{renderProduct()}</td>
      <td>
        <StatusBadge status={purchase.status} order_id={purchase.order_id} />
      </td>
      <td className="datetime">{formatDateTime(purchase.createdAt)}</td>
      <td>
        {"$"}
        {formatMonto(purchase.amount)}
      </td>
      <td>{renderDiscount()}</td>
      <td className="datetime">{renderExpiration()}</td>
      <td>
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Edit Purchase"
          className="btn btn-round btn-sm me-2"
          onClick={() => handleEdit(purchase)}
        >
          <i className="fa fa-edit"></i>
        </button>
        {canCancel()}
      </td>
    </tr>
  );
};

export default PurchaseCard;
