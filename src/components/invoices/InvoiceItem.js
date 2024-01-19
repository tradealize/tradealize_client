import moment from "moment";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { formatMonto } from "../../utils";
import OrderStatusBadge from "../order/OrderStatusBadge";

const InvoiceItem = ({ invoice, handleEdit }) => {
  const { user } = useContext(AuthContext);

  const renderButton = () => {
    if (user.user_type_id > 2) {
      return (
        <button
          className="btn btn-sm text-primary"
          onClick={() => handleEdit(invoice)}
        >
          <i className="fa fa-edit"></i>
        </button>
      );
    }
  };

  return (
    <div className="row py-2 border-top align-items-center">
      <div className="col-4 bold">#{invoice.invoice_id}</div>
      <div className="col-4 bold">${formatMonto(invoice.amount)}</div>
      <div className="col-4 bold text-center">{invoice.currency}</div>
      <div className="col-4">
        <OrderStatusBadge status={invoice.status} />
      </div>
      <div className="col-4">
        {moment(invoice.max_date).utc().format("MMM Do YYYY")}
      </div>
      <div className="col-4 text-center">{renderButton()}</div>
    </div>
  );
};

export default InvoiceItem;
