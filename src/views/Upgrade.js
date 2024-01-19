import { Link } from "@reach/router";
import paymenticons from "../assets/paymenticons.png";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Upgrade = ({ children }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <div className="container py-5">
      <div className="card mw-500 m-auto p-3 shadow">
        <h1 className="text-center">You're out of credits</h1>
        {children}
        <p>Click the button to see pricing options.</p>
        <Link to="/pricing" className="btn btn-primary">
          See Pricing
        </Link>
        <img
          src={paymenticons}
          alt="payment icons"
          style={{ maxWidth: 250 }}
          className="w-100 d-block m-auto my-3"
        />
        <button
          onClick={signOut}
          className="btn text-muted m-auto d-block my-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Upgrade;
