import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserData from "../components/user/UserData";

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className="container">
      <h1 className="h2 mb-4">My Profile</h1>
      <div className="card p-3 my-3">
        <UserData user={user} />
      </div>
      <button className="btn btn-outline-danger" onClick={signOut}>
        <i className="fa fa-sign-out-alt"></i> Sign Out
      </button>
    </div>
  );
};

export default Profile;
