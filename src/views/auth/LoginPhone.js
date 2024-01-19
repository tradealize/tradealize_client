import React, { useRef, useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import { Link, navigate } from "@reach/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const LoginPhone = ({ callback }) => {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const recaptchaRef = useRef(null);
  const [recaptcha, setRecaptcha] = useState(null);

  const {
    user,
    signInPhone,
    phoneExists,
    notAuthProvider,
    resetAuthProvider,
    phoneNumberExists,
    confirmationResult,
    signInWithPhoneNumber,
  } = useContext(AuthContext);

  useEffect(() => {
    if (recaptchaRef !== null && recaptcha === null) {
      setupRecaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recaptchaRef]);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (phoneExists !== null) {
      if (phoneExists) {
        signInWithPhoneNumber("+" + phone, recaptcha);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneExists]);

  const handleSubmitCode = () => {
    confirmationResult
      .confirm(code)
      .then(() => {
        if (typeof callback === "function") {
          return callback(phone);
        }
        signInPhone();
      })
      .catch(alert);
  };

  const handleReset = () => {
    resetAuthProvider();
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    phoneNumberExists(phone);
  };

  const setupRecaptcha = () => {
    const recaptchaVerifier = AuthService.getRecaptchaVerifier("sign-in");
    setRecaptcha(recaptchaVerifier);
  };

  const renderForm = () => {
    if (notAuthProvider) {
      return (
        <div className="card p-3 shadow">
          <h3 className="bold text-center">Use Email to Sign In</h3>
          <p>This account is configured to sign in with email and password.</p>
          <p>After signing in, you can set up phone login from "Settings"</p>
          <button className="btn btn-primary w-100 my-3" onClick={handleReset}>
            <i className="fa fa-envelope"></i> Sign In with Email
          </button>
        </div>
      );
    }
    if (confirmationResult === null) {
      return (
        <form className="card p-3 shadow-sm" onSubmit={handleSubmit}>
          <label className="d-block mb-2">Phone Number</label>
          <PhoneInput
            country={"us"}
            value={phone}
            enableSearch={true}
            onChange={(phone) => setPhone(phone)}
          />
          <div className="container-fluid px-0">
            <button
              id="sign-in"
              ref={recaptchaRef}
              disabled={recaptcha === null}
              className="btn btn-primary w-100 d-block m-auto my-4"
            >
              Send Code
            </button>
          </div>
          <Link
            to="/login"
            className="btn btn-outline-primary text-accent h6 text-center d-block w-100"
          >
            <i className="fa fa-envelope me-1"></i> Sign In with Email
          </Link>
          <div className="row mt-3 align-items-center">
            <div className="col-12 col-md-6">
              <h3 className="bold text-center mb-0">
                Don't have an account yet?
              </h3>
            </div>
            <div className="col-12 col-md-6">
              <Link
                to="/signup/phone"
                className="text-primary h6 text-center d-block w-100"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      );
    }
    return (
      <div className="card p-3 shadow">
        <label className="d-block mb-2">Enter the Code</label>
        <input
          type="text"
          value={code}
          placeholder="0000"
          className="form-control"
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="container-fluid px-0 mt-3">
          <button
            type="submit"
            className="btn btn-primary w-100 d-block m-auto"
            onClick={handleSubmitCode}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid py-3">
      <h1 className="text-center">Sign In with Phone</h1>
      {renderForm()}
    </div>
  );
};

export default LoginPhone;
