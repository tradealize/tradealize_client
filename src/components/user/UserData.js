import React from "react";

const UserData = ({ user }) => {
  return (
    <div className="container-fluid">
      <div className="row pb-3 border-bottom">
        <div className="col-4 ps-0">Name</div>
        <div className="col-8 pe-0 text-end text-muted">
          {user.name} {user.last_name}
        </div>
      </div>
      <div className="row py-3 border-bottom">
        <div className="col-4 ps-0">Email</div>
        <div className="col-8 pe-0 text-end text-muted small">{user.email}</div>
      </div>
      <div className="row py-3 border-bottom">
        <div className="col-4 ps-0">Company</div>
        <div className="col-8 pe-0 text-end text-muted small">
          {user.company}
        </div>
      </div>
    </div>
  );
};

export default UserData;
