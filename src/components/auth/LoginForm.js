import React, { useState, useContext, useEffect } from "react";
import { Link } from "@reach/router";
import { AuthContext } from "../../context/AuthContext";
import useTranslations from "../../hooks/useTranslations";
import { AppConfigContext } from "../../context/AppConfigContext";

const LoginForm = ({ title, setLogin, handleCallback }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { landing_bg_className, landing_text_className } =
    useContext(AppConfigContext);
  const { user, spinner, signIn, reattempt } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const translations = useTranslations();

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reattempt && email !== "" && password !== "") {
      signIn(email, password, handleCallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reattempt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password, handleCallback);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const renderTitle = () => {
    if (title && title !== null) {
      return title;
    }
    return translations.auth.login;
  };

  const renderSignUp = () => {
    if (!user || user === null) {
      return (
        <div>
          <p className={`text-center mb-0 mt-3 ${landing_text_className}`}>
            {translations.auth.no_account}
          </p>
          {typeof setLogin === "function" ? (
            <button onClick={setLogin} className="btn btn-link w-100">
              {translations.auth.signup}
            </button>
          ) : (
            <Link to="/auth/signup" className="btn btn-link w-100">
              {translations.auth.signup}
            </Link>
          )}
        </div>
      );
    }
  };

  return (
    <div id="login-card">
      <h2 className="text-center text-gradient mb-3">{renderTitle()}</h2>
      <div
        className={`card text-left shadow p-4 ${landing_bg_className} ${landing_text_className}`}
      >
        <form onSubmit={handleSubmit}>
          <label className={`${landing_text_className}`}>
            {translations.auth.email}
          </label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={`${landing_text_className}`}>
            {translations.auth.password}{" "}
            <button
              className="btn btn-link text-muted text-left text-small py-0 mb-1"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                togglePassword();
              }}
            >
              <span className="text-montserrat text-small text-auto">
                {showPassword ? translations.auth.hide : translations.auth.show}
              </span>
            </button>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/auth/recovery">{translations.auth.forgot}</Link>
          <button type="submit" className="btn btn-primary w-100 my-3">
            {spinner ? (
              <div className="spinner-border"></div>
            ) : (
              translations.auth.login
            )}
          </button>
        </form>
        {renderSignUp()}
      </div>
    </div>
  );
};

export default LoginForm;
