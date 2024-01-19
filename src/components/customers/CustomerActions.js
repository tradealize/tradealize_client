import React, { useContext, useEffect, useState } from "react";
import { formatMonto, getTotalCompras } from "../../utils";
import { ModalContext } from "../../context/ModalContext";
import moment from "moment";
import { AppConfigContext } from "../../context/AppConfigContext";
import { CustomerContext } from "../../context/CustomerContext";
import { AuthContext } from "../../context/AuthContext";
import useTranslations from "../../hooks/useTranslations";



const CustomerActions = ({ customer }) => {
  const [copied, setCopied] = useState(false);
  const { recoverPassword } = useContext(AuthContext);

  const translations = useTranslations();
  const usersTranslations = translations.admin.users;

  const {
    link,
    getPasswordResetLink,
  } = useContext(CustomerContext);

  const { success } = useContext(ModalContext);

  const { videos_enabled } = useContext(AppConfigContext);

  useEffect(() => {
    if (link !== null && link?.length > 0) {
      let input = document.createElement("input");
      input.value = link;
      input.id = "copy-input";
      document.body.appendChild(input);
      var copyText = document.getElementById("copy-input");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
      navigator.clipboard.writeText(copyText.value).then(() => {
        setCopied(true);
        success("Enlace copiado al portapapeles.");
      });
      input.remove();
    }
  }, [link]);

  const renderExpiration = () => {
    if (customer.has_online && customer.user === null) {
      return (
        <span>
          {" "}
          hasta {moment(customer.online_expiration).format("DD MMM YYYY")}
        </span>
      );
    }
  };

  const renderOnlineAccess = () => {
    if (parseInt(videos_enabled)) {
      return (
        <div className="row mb-3">
          <div className="col-6">Acceso a Clases Online</div>
          <div className="col-6">
            {customer.has_online ? (
              <span className="badge badge-pill bg-success">
                Activo{renderExpiration()}
              </span>
            ) : (
              <span className="badge badge-pill bg-secondary">Inactivo</span>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid px-0">
      <h4>{usersTranslations.recoveryPass}</h4>

      <button
        className="btn btn-outline-dark me-2 my-1"
        onClick={() => recoverPassword(customer.email)}
      >
        <i className="fa fa-envelope me-2"></i> {usersTranslations.sendEmail}
      </button>
      <button
        className="btn btn-outline-dark me-2 my-1"
        onClick={() => getPasswordResetLink(customer.email)}
      >
        <i className="fa fa-link me-2"></i> {usersTranslations.generateLink}
      </button>
      <h4 className="mt-4">
        {usersTranslations.totalPurchases}: {"$"}
        {formatMonto(getTotalCompras(customer))} MXN
      </h4>
      {renderOnlineAccess()}
    </div>
  );
};

export default CustomerActions;
