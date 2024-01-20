import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";
import { Link, navigate } from "@reach/router";
import PhoneInput from "react-phone-input-2";

const SignUpPhone = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [recaptcha, setRecaptcha] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [signupReason, setSignUpReason] = useState("Recommendation");
  const {
    user,
    spinner,
    signUpPhone,
    confirmationResult,
    signInWithPhoneNumber,
  } = useContext(AuthContext);

  useEffect(() => {
    if (recaptcha === null) {
      setupRecaptcha();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmitCode = (e) => {
    e.preventDefault();
    confirmationResult.confirm(code).then((user) => {
      user = user.user;
      signUpPhone(name, phone, user.uid);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (String(phone).length < 10) {
      return alert("El número de teléfono debe tener 10 dígitos.");
    }
    signInWithPhoneNumber("+" + phone, recaptcha);
  };

  const setupRecaptcha = () => {
    const recaptchaVerifier = AuthService.getRecaptchaVerifier("sign-in");
    setRecaptcha(recaptchaVerifier);
  };

  const renderOtro = () => {
    if (signupReason === "otro") {
      return (
        <div className="mt-3">
          <label>Tell us more</label>
          <input
            type="text"
            className="form-control"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        </div>
      );
    }
  };

  const renderForm = () => {
    if (confirmationResult === null) {
      return (
        <form className="card p-3 shadow-sm" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              {" "}
              <label>Name</label>
              <input
                type="text"
                value={name}
                placeholder="Juan"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                placeholder="Pérez"
                className="form-control mb-3"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label className="d-block mb-2">Phone Number</label>
          <div className="input-group mb-3">
            <PhoneInput
              country={"us"}
              value={phone}
              enableSearch={true}
              onChange={(phone) => setPhone(phone)}
            />
          </div>
          <label>How did you find out about Tradealize?</label>
          <select
            className="form-control"
            value={signupReason}
            onChange={(e) => setSignUpReason(e.target.value)}
          >
            <option>Recommendation</option>
            <option>Instagram Ad</option>
            <option>Facebook Ad</option>
            <option value="otro">Other</option>
          </select>
          {renderOtro()}
          <div className="container-fluid px-0">
            <button
              id="sign-in"
              disabled={recaptcha === null || spinner}
              className="btn btn-primary w-100 d-block m-auto my-4"
            >
              {spinner ? <div className="spinner-border"></div> : "Regístrate"}
            </button>
          </div>
          <Link
            to="/signup"
            className="btn btn-outline-primary mb-3 text-accent h6 text-center d-block w-100"
          >
            <i className="fa fa-envelope me-2"></i> Sign Up with Email
          </Link>
          <div className="row align-items-center mt-3">
            <div className="col-12 col-md-6">
              <h3 className="bold text-center mb-0">
                Already have an account?
              </h3>
            </div>
            <div className="col-12 col-md-6">
              <Link to="/login/phone" className="btn btn-link w-100">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      );
    }
    return (
      <form className="card p-3 shadow-sm" onSubmit={handleSubmitCode}>
        <label className="d-block mb-2">Enter the Code</label>
        <input
          type="text"
          value={code}
          placeholder="0000"
          className="form-control"
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="container-fluid px-0 my-3">
          <button className="btn btn-primary w-100 d-block m-auto">
            {spinner ? <div className="spinner-border"></div> : "Confirm"}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid py-3">
      <h1 className="text-center">Sign Up with Phone</h1>
      {renderForm()}
    </div>
  );
};

export default SignUpPhone;
