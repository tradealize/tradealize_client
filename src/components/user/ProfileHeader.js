import React from "react";

const ProfileHeader = ({ title, onClick }) => {
  return (
    <div className="row my-3 mx-0 align-items-center border-bottom">
      <div className="col-6 px-0">
        <h3 className="bold mb-0">{title}</h3>
      </div>
      <div className="col-6 px-0 text-end">
        <button className="btn btn-sm btn-link" onClick={onClick}>
          <i className="fa fa-edit me-1"></i> Editar
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
