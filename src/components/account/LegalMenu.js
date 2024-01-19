import { Link } from "@reach/router";
import React from "react";

const LegalMenu = () => {
  return (
    <div className="card py-3 px-2 bg-gray border my-3">
      <h5 className="mx-2">Información Adicional</h5>
      <Link
        to="/privacidad"
        className="btn w-100 small hover-light py-1 px-2 text-left text-white"
      >
        <i className="fa fa-info-circle me-3"></i>
        Aviso de Privacidad
      </Link>
      <Link
        to="/terminos-y-condiciones"
        className="btn w-100 small hover-light py-1 px-2 text-left text-white"
      >
        <i className="fa fa-info-circle me-3"></i>
        Términos y Condiciones
      </Link>
    </div>
  );
};

export default LegalMenu;
