import React from "react";
import { API_URL } from "../../utils";

const UserCard = ({ user, children }) => {
  const renderImage = () => {
    if (user && user !== null) {
      const { file } = user;
      if (file && file !== null) {
        return <img src={`${API_URL}/${file.name}.${file.type}`} />;
      }
    }
    return <i className="fa fa-user-circle fa-2x"></i>;
  };

  const renderName = () => {
    if (user && user !== null) {
      return user.name;
    }
  };

  return (
    <div className="row user-card">
      <div className="col-4">{renderImage()}</div>
      <div className="col-8">
        <h4>{renderName()}</h4>
        {children}
      </div>
    </div>
  );
};

export default UserCard;
