import React from "react";
import { Link } from "@reach/router";

const AccountMenu = () => {
  return (
    <div className="card py-3 px-2 bg-gray border my-3">
      <h4 className="mx-2">Facturación</h4>
      <Link
        to="/mypanel/account/metodos-pago"
        className="btn w-100 small hover-light py-1 px-2 text-left text-white"
      >
        <i className="fa fa-credit-card me-3"></i>Mis Métodos de Pago
      </Link>
      <Link
        to="/mypanel/account/purchases"
        className="btn w-100 small hover-light py-1 px-2 text-left text-white"
      >
        <i className="fa fa-shopping-basket me-3"></i>Mis Compras
      </Link>
      <Link
        to="/mypanel/account/invoices"
        className="btn w-100 small hover-light py-1 px-2 text-left text-white"
      >
        <i className="fa fa-sync me-3"></i>
        Mis Cargos
      </Link>
    </div>
  );
};

export default AccountMenu;
