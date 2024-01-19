import moment from "moment";
import React from "react";
import { Link } from "@reach/router";

const AsistenteRow = ({
  user,
  asistente,
  confirmCancel,
  postPayment,
  postAttend,
  single_class_id,
  is_special_event,
}) => {
  const sendWhatsApp = (telefono) => {
    telefono = String(telefono).replace("+52", "");
    window.open(`https://wa.me/521${telefono}`, "_blank");
  };

  return (
    <tr className="align-middle small bg-white">
      <td>
        {asistente.birthday &&
          asistente.birthday !== null &&
          moment(asistente.birthday).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD") && (
            <i className="fa fa-birthday-cake"></i>
          )}
        <Link to={`/myadmin/customer/${asistente.customer_id}`}>
          {asistente.customer.name} {asistente.customer.last_name}
        </Link>
      </td>
      <td>
        <i className="fab fa-instagram me-2"></i>
        {"@"}
        {asistente.instagram}
      </td>
      <td>
        <i className="fa fa-envelope me-2"></i>
        {asistente.email}
      </td>
      <td>
        <button
          className="me-2 btn-sm btn btn-success"
          onClick={() => sendWhatsApp(asistente.phone)}
        >
          <i className="fab fa-whatsapp"></i>
        </button>
        {asistente.phone}
      </td>
      {!is_special_event && (
        <td>
          <button
            className={`btn btn-sm btn-${
              !asistente.attend ? "outline-secondary" : "link text-dark"
            } me-2`}
            onClick={() =>
              postAttend(
                asistente.class_reservation_id,
                !asistente.attend,
                single_class_id
              )
            }
          >
            <i className="fa fa-check"></i>
          </button>
          {asistente.is_cash && (
            <button
              className={`btn btn-sm btn-outline-${
                asistente.is_paid ? "danger" : "success"
              } mx-2`}
              onClick={() =>
                postPayment(
                  asistente.class_reservation_id,
                  !asistente.is_paid,
                  single_class_id
                )
              }
            >
              <i className="fa fa-money-bill"></i>
            </button>
          )}
          {["admin", "manager"].includes(user.role) && (
            <button
              className="btn btn-sm btn-outline-danger mx-2"
              onClick={() => confirmCancel(asistente)}
            >
              <i className="fa fa-times"></i>
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default AsistenteRow;
