import { Link } from "@reach/router";

import React from "react";

const CheckoutHeader = () => {
  return (
    <div className="row fixed-top bg-white border-bottom align-items-center pb-3 pt-3">
      <div className="container-fluid">
        <div className="container px-2">
          <div className="row align-items-center">
            <div className="col-12 col-md-9 col-lg-10">
              <h1 className="mb-0">Checkout</h1>
            </div>
            <div className="col-12 col-md-3 col-lg-2 text-end">
              <Link to="/">
                <img
                  src="https://tradealizebot.s3.us-west-1.amazonaws.com/tradealize-logo.png"
                  className="mw-100 w-100 d-block m-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutHeader;
