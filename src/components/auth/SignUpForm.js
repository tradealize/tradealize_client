import React, { useState, useContext } from "react";
import { Link } from "@reach/router";
import { AuthContext } from "../../context/AuthContext";
import { validateEmail, validatePhoneNumber } from "../../utils";
import useTranslations from "../../hooks/useTranslations";
import { AppConfigContext } from "../../context/AppConfigContext";

const SignUpForm = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signupReason, setSignUpReason] = useState("Recomendación");
  const [customReason, setCustomReason] = useState("");
  const { spinner, signUp } = useContext(AuthContext);
  const { landing_bg_className, landing_text_className } =
    useContext(AppConfigContext);

  const translations = useTranslations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      return alert("Name is invalid.");
    }
    if (lastName === "") {
      return alert("Last name is invalid.");
    }
    if (!validateEmail(email)) {
      return alert("Email is invalid.");
    }
    if (String(password).length < 6) {
      return alert("Password must be 6 characters long.");
    }
    if (!validatePhoneNumber(phone)) {
      return alert("Phone number is invalid.");
    }
    signUp(
      name,
      lastName,
      email,
      password,
      phone,
      signupReason === "Other" || signupReason === "Otro"
        ? customReason
        : signupReason
    );
  };

  const renderOtro = () => {
    if (signupReason === "Other" || signupReason === "Otro") {
      return (
        <div>
          <label className={landing_text_className}>
            {translations.auth.other_reason}
          </label>
          <input
            type="text"
            className="form-control mb-3"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          />
        </div>
      );
    }
  };

  return (
    <div id="login-card">
      <h2 className="text-center text-gradient mb-3">
        {translations.auth.signup}
      </h2>
      <div
        className={`card text-left shadow-sm p-4 ${landing_bg_className} ${landing_text_className}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6 ps-0">
              <label className={landing_text_className}>
                {translations.auth.name}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="col-6 pe-0">
              <label className={landing_text_className}>
                {translations.auth.last_name}
              </label>
              <input
                type="text"
                className="form-control mb-3"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <label className={landing_text_className}>
            {translations.auth.company}
          </label>
          <input
            type="text"
            className="form-control mb-3"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <label className={landing_text_className}>
            {translations.auth.email}
          </label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={landing_text_className}>
            {translations.auth.password}
          </label>
          <input
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={landing_text_className}>
            {translations.auth.confirm_password}
          </label>
          <input
            type="password"
            className="form-control mb-3"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label className={landing_text_className}>
            {translations.auth.phone}
          </label>
          <input
            type="tel"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className={landing_text_className}>
            {translations.auth.signup_reason}
          </label>
          <select
            className="form-control mb-3"
            value={signupReason}
            onChange={(e) => setSignUpReason(e.target.value)}
          >
            {translations.auth.signup_reasons.map((reason) => (
              <option value={reason}>{reason}</option>
            ))}
          </select>
          {renderOtro()}
          <button type="submit" className="btn btn-primary w-100 mb-3">
            {spinner ? (
              <div className="spinner-border"></div>
            ) : (
              translations.auth.signup
            )}
          </button>
        </form>
        <p className={`mb-0 mt-3 text-center ${landing_text_className}`}>
          {translations.auth.has_account}
        </p>
        {typeof setLogin === "function" ? (
          <button onClick={setLogin} className="btn btn-link w-100">
            {translations.auth.login}
          </button>
        ) : (
          <Link to="/auth" className="btn btn-link w-100">
            {translations.auth.login}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
