import { Link } from "@reach/router";
import React from "react";
import amex from "../../assets/images/amex.png";
import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";
import { S3_ENDPOINT } from "../../utils";

const Footer = () => {
  return (
    <div className="row px-3 align-items-center footer py-5">
      <div className="container-fluid text-white">
        <div className="container text-white">
          <div className="row">
            <div className="col-12 col-md-4 my-3 text-center">
              <img
                id="footer-logo"
                alt="My Realty Closer Logo"
                src={`${S3_ENDPOINT}/logo-blanco.png`}
                className="mw-100 w-100 p-3"
              />
            </div>
            <div className="col-12 col-md-4 my-3">
              <h4 className="text-pink text-montserrat bold">CONTACTO</h4>
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:hola@myrealtycloser.com"
                  className="text-white no-decoration pointer small"
                >
                  <i className="fa fa-envelope me-2"></i>{" "}
                  hola@myrealtycloser.com
                </a>
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://instagram.com"
                  className="text-white no-decoration pointer"
                >
                  <i className="fab fa-instagram me-2"></i> @myrealtycloser
                </a>
              </p>
            </div>

            <div className="col-12 col-md-4 my-3">
              <h4 className="text-pink text-montserrat bold">ACEPTAMOS</h4>
              <img
                src={amex}
                alt="American Express"
                className="payment-method me-2"
              />
              <img
                src={mastercard}
                alt="Mastercard"
                className="payment-method me-2"
              />
              <img src={visa} alt="Visa" className="payment-method me-2" />
            </div>
          </div>

          <div className="row small">
            <div className="col-12 col-md-4">
              <span>Copyright 2023 &copy; My Realty Closer</span>
            </div>
            <div className="col-12 col-md-4">
              <Link
                to="/terminos-y-condiciones"
                className="text-white small mx-2"
              >
                Términos y Condiciones
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <Link to="/privacidad" className="text-white small mx-2">
                Aviso de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
