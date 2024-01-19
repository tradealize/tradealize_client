import { Link } from "@reach/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Recovery = () => {
  const [email, setEmail] = useState("");

  const { recoverPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    recoverPassword(email);
  };
  return (
    <div className="container-fluid">
      <h1 className="text-white text-center">Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="card p-4">
          <label className="d-block mb-2">Email</label>
          <div className="input-group">
            <span className="input-group-text" id="email-addon">
              <i className="fa fa-envelope text-primary"></i>
            </span>
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              alia-aria-describedby="email-addon"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="container-fluid px-0">
            <button className="btn btn-primary w-100 d-block m-auto my-4">
              Send Reset Link
            </button>
          </div>
          <div className="container-fluid px-0">
            <Link
              to="/auth"
              className="text-accent h6 text-center d-block w-100"
            >
              Remembered password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Recovery;
