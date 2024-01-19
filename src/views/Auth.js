import React, { useContext } from "react";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Recovery from "./auth/Recovery";
import { Router } from "@reach/router";
import { AppConfigContext } from "../context/AppConfigContext";

const Auth = () => {
  const { landing_bg_className } = useContext(AppConfigContext);
  return (
    <div
      id="particles-container"
      className={`container-fluid px-0 ${landing_bg_className}`}
      style={{
        overflow: "hidden",
      }}
    >
      <div className="auth container px-0">
        <Router>
          <Login path="/login" isHome default />
          <SignUp path="/signup" isHome />
          <Recovery path="/recovery" isHome />
        </Router>
      </div>
    </div>
  );
};

export default Auth;
