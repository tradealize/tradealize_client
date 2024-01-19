import React from "react";
import LoginForm from "../../components/auth/LoginForm";

const Login = ({ isHome }) => {
  return (
    <div className="container-fluid mt-3">
      <LoginForm isHome={isHome} />
    </div>
  );
};

export default Login;
