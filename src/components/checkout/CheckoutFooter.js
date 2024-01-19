import { Link } from "@reach/router";
import React from "react";

const CheckoutFooter = () => {
  return (
    <div className="row fixed-bottom w-100 mx-0 bg-dark text-white py-2">
      <div className="container-fluid px-0">
        <div className="container">
          <div className="row">
            <div className="col col-md-6">
              <Link to="/privacidad" className="text-white">
                Privacy Policy
              </Link>
            </div>
            <div className="col col-md-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFooter;
