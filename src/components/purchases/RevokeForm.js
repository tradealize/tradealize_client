import React from "react";

const RevokeForm = ({ purchase, customer_id, revokePurchase }) => {
  return (
    <div>
      <p>
        ¿Estás seguro que deseas revocar el acceso de la compra {purchase.title}
        ? Esto significa que el acceso a los beneficios del paquete se perderán
        inmediatamente. Esta acción NO puede deshacerse.
      </p>
      <button
        className="btn btn-danger"
        onClick={() => revokePurchase(purchase.purchase_id, customer_id)}
      >
        Revocar Acceso
      </button>
    </div>
  );
};

export default RevokeForm;
