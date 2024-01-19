import React from "react";
import { formatMonto } from "../../utils";
import moment from "moment";
import StatusBadge from "../global/StatusBadge";
import { ModalContext } from "../../context/ModalContext";
import { useContext } from "react";
import InvoiceForm from "./InvoiceForm";
import { CustomerContext } from "../../context/CustomerContext";
import { useEffect } from "react";
import useTranslations from "../../hooks/useTranslations";

const InvoiceCard = ({ invoice }) => {
  const { getSingleCustomer, customer } = useContext(CustomerContext);
  const { modalComponent } = useContext(ModalContext);

  const translations = useTranslations();
  const { formatDateTime } = translations;

  useEffect(() => {
    // getSingleCustomer(invoice.user_id);
  }, []);

  const renderExpiration = () => {
    if (invoice.expiration_date && invoice.expiration_date !== null) {
      return formatDateTime(invoice.expiration_date);
    }
    if (invoice.subscription_id !== null && invoice.status === "cancelled") {
      let free_trial_cancel = moment(invoice.createdAt);
      if (invoice.free_trial_length !== null) {
        free_trial_cancel.add(invoice.free_trial_length, "days");
      }
      let cancel_expiration = moment(invoice.updatedAt).add(
        invoice.subscription_interval,
        invoice.subscription_period
      );
      let expiration_date = cancel_expiration;
      if (free_trial_cancel.isAfter(cancel_expiration)) {
        expiration_date = free_trial_cancel;
      }
      return formatDateTime(expiration_date);
    }
    let expiration_date = moment(invoice.createdAt);
    return formatDateTime(
      expiration_date.add(
        invoice.subscription_interval,
        invoice.subscription_period
      )
    );
  };

  const handleEdit = () => {
    modalComponent(
      "Editar Cargo",
      <InvoiceForm customer={customer} invoice={invoice} />
    );
  };

  const renderActions = () => {
    return (
      <button className="btn btn-sm" onClick={handleEdit}>
        <i className="fa fa-edit"></i>
      </button>
    );
  };

  return (
    <tr className="border text-dark">
      <td className="id">{invoice.invoice_id}</td>
      <td className="id">{invoice?.purchase?.product?.name}</td>
      <td>
        <StatusBadge status={invoice.status} order_id={invoice.order_id} />
      </td>
      <td className="datetime">{formatDateTime(invoice.createdAt)}</td>
      <td>
        {"$"}
        {formatMonto(invoice.amount)}
      </td>
      <td className="datetime">{renderExpiration()}</td>
      <td>{renderActions()}</td>
    </tr>
  );
};

export default InvoiceCard;
