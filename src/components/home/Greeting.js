import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Greeting = () => {
  const { user } = useContext(AuthContext);

  const renderName = () => {
    if (user && user !== null) {
      return user.name;
    }
    return "Juan Manuel";
  };

  return (
    <div className="row py-3 align-items-center">
      <div className="col-2 text-center">
        <i className="fa fa-user-circle fa-3x"></i>
      </div>
      <div className="col-10">
        <h1 className="mb-1">Welcome Back!</h1>
        <p className="text-muted mb-0">Hi, {renderName()}</p>
      </div>
    </div>
  );
};

export default Greeting;
