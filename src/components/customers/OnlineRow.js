import moment from "moment";
import React from "react";
import { Link } from "@reach/router";

const OnlineRow = ({ customer }) => {
  const renderName = () => {
    if (
      (customer.name !== null && customer.name !== "") ||
      (customer.last_name !== null && customer.last_name !== "")
    ) {
      return `${customer.name} ${customer.last_name}`;
    }
    return "N/D";
  };
  return (
    <tr className="p-2 border-bottom small align-middle hover-light">
      <td className="td-id">{customer.customer_id}</td>
      <td>
        <Link to={`/myadmin/customer/${customer.customer_id}`}>
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
      <td>{moment(customer.expiration_date).format("DD MMM YYYY")}</td>
    </tr>
  );
};

export default OnlineRow;
