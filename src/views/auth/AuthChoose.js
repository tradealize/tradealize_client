import React from "react";
import { Link } from "@reach/router";

const AuthChoose = () => {
  return (
    <div className="container py-3">
      <h1 className="text-center mb-3">Tradealize</h1>
      <div className="card p-3 shadow-sm">
        <Link to="/login" className="btn btn-primary w-100 d-block m-auto mb-3">
          <i className="fa fa-envelope me-2"></i>Entrar con Correo
        </Link>
        <Link
          to="/login/phone"
          className="btn btn-outline-primary w-100 d-block m-auto mb-3"
        >
          <i className="fa fa-phone me-2 fa-flip-horizontal"></i>Entrar con
          Celular
        </Link>
      </div>
    </div>
  );
};

export default AuthChoose;
