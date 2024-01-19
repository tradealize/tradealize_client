import React, { useEffect, useContext } from "react";
import UserDataForm from "../components/user/UserDataForm";
import { AuthContext } from "../context/AuthContext";

const UserData = () => {
  const { user, user_data, setUserData } = useContext(AuthContext);

  useEffect(() => {
    if (user_data || user_data === null) {
      setUserData(user);
    }
  }, [user]);

  return (
    <div>
      <h2>Información Básica</h2>
      <div className="card p-3 shadow">
        <UserDataForm />
      </div>
    </div>
  );
};

export default UserData;
