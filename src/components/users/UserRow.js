import React from "react";

const UserRow = ({ user, editUser, deleteUser }) => {
  return (
    <div className="row py-2 small hover-light border-bottom align-items-center">
      <div className="col">
        {user.user.name} {user.user.last_name}
      </div>
      <div className="col">{user.user.email}</div>
      <div className="col text-capitalize">{user.role}</div>
      <div className="col">
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => editUser(user)}
        >
          <i className="fa fa-edit"></i> Editar
        </button>

        <button
          className="btn btn-outline-danger mx-3 btn-sm"
          onClick={() => deleteUser(user)}
        >
          <i className="fa fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  );
};

export default UserRow;
