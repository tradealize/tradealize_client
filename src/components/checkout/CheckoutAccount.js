import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const CheckoutAccount = () => {
  //Singup and Login
  const [login, setLogin] = useState(false);
  const { spinner, user, signIn, signUp } = useContext(AuthContext);

  const handleSubmitLogin = (correo, password) => {
    signIn(correo, password);
  };

  const handleSubmitSignUp = (nombre, correo, password, telefono) => {
    signUp(nombre, correo, password, telefono);
  };

  const renderCreateAccount = () => {
    if (user === null) {
      if (login) {
        return (
          <LoginForm
            handleSubmitLogin={handleSubmitLogin}
            setLogin={() => setLogin(false)}
            spinner={spinner}
          />
        );
      }
      return (
        <SignUpForm
          handleSubmitSignUp={handleSubmitSignUp}
          setLogin={() => setLogin(true)}
          spinner={spinner}
        />
      );
    }
  };

  return <div>{renderCreateAccount()}</div>;
};

export default CheckoutAccount;
