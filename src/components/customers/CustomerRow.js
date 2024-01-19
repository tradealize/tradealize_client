import moment from "moment";
import React from "react";
import { Link } from "@reach/router";
import { formatMonto } from "../../utils";

const CustomerRow = ({ customer, extraFields, showCancelReason }) => {
  const renderName = () => {
    const { name, last_name } = customer;
    return `${name !== null ? name : ""} ${last_name !== null ? last_name : ""
      }`;
  };

  const renderExtraFields = () => {
    if (Array.isArray(extraFields)) {
      return extraFields.map((field) => <td>{customer[field.key]}</td>);
    }
  };

  const renderCancel = () => {
    if (showCancelReason) {
      if (Array.isArray(customer.purchases)) {
        const purchase = customer.purchases.find(
          (purchase) => purchase.cancel_reason !== null
        );
        return <td>{purchase ? purchase.cancel_reason : ""}</td>;
      }
    }
  };

  return (
    <tr className="p-2 border-bottom small align-middle hover-light">
      <td className="td-id">{customer.user_id}</td>
      <td>
        <Link to={`${customer.user_id}`}>
          <i className="fa fa-eye me-2"></i>
          {renderName()}
        </Link>
      </td>
      <td>
        <a
          target="_blank"
          rel="noreferrer"
          href={`mailto:${customer.email}`}
          className="text-secondary"
        >
          <i className="fa fa-envelope me-2"></i>
          {customer.email}
        </a>
      </td>
      <td>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/52${customer.phone}`}
          className={
            customer.phone !== null ? "text-success" : "text-secondary"
          }
        >
          <i className="fab fa-whatsapp me-2"></i>
          {customer.phone}
        </a>
      </td>
      <td>
        <i className="fa fa-calendar"></i>{" "}
        {customer.birthdate !== null &&
          moment(customer.birthdate).format("DD MMM YYYY")}
      </td>
      <td>
        {"$"}
        {formatMonto(customer.value)}
      </td>
      {renderExtraFields()}
      {renderCancel()}
    </tr>
  );
};

export default CustomerRow;
