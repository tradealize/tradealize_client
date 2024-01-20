import React from "react";
import { Link } from "@reach/router";

const Sorry = () => {
  return (
    <div className="container-fluid py-4">
      <div className="container">
        <div
          className="card p-3 shadow d-block m-auto"
          style={{ maxWidth: 600 }}
        >
          <h1>Oops! You're out of credits.</h1>
          <h3>You need an active subscription to Tradealize</h3>
          <Link to="/pricing" className="btn btn-primary mb-3 w-100">
            Get Access Now!
          </Link>
          <Link to="/" className="btn text-muted w-100">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sorry;
