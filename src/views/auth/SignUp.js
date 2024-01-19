import React, { useContext, useEffect } from "react";
import SignUpForm from "../../components/auth/SignUpForm";
import { AuthContext } from "../../context/AuthContext";
import { navigate } from "@reach/router";

const SignUp = ({ isHome }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container-fluid mt-3">
      <SignUpForm isHome={isHome} />
    </div>
  );
};

export default SignUp;
