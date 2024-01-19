import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { hideModal } from "../../utils";

const AccountDelete = () => {
  const [email, setEmail] = useState("");

  const { user, spinner, deleteUser } = useContext(AuthContext);

  return (
    <div>
      <p>
        Para eliminar tu cuenta debes escribir el correo electrónico de la
        misma.
      </p>
      <label className="d-block mb-3">Escribe el correo: {user.email}</label>
      <input
        id="email"
        type="email"
        value={email}
        className="form-control"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="row my-3">
        <div className="col-6">
          <button
            onClick={deleteUser}
            className="btn btn-danger w-100 btn-sm"
            disabled={email !== user.email || spinner}
          >
            <i className="fa fa-trash"></i>{" "}
            {spinner ? (
              <div className="spinner-border"></div>
            ) : (
              "ELIMINAR CUENTA"
            )}
          </button>
        </div>
        <div className="col-6">
          <button className="btn btn-light w-100 btn-sm" onClick={hideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
