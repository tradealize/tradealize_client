import React from "react";
import BirthdateInput from "../common/BirthdateInput";

const UserForm = ({ user, handleCancel, handleSubmit, setPropertyUser }) => {
  const { name, last_name, birthdate, instagram, phone } = user;

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input
        type="text"
        className="form-control mb-3"
        value={name}
        onChange={(e) => setPropertyUser("name", e.target.value)}
      />
      <label>Apellidos:</label>
      <input
        type="text"
        className="form-control mb-3"
        value={last_name}
        onChange={(e) => setPropertyUser("last_name", e.target.value)}
      />
      <label>Instagram:</label>
      <input
        type="text"
        className="form-control mb-3"
        value={instagram !== null ? instagram : ""}
        onChange={(e) => setPropertyUser("instagram", e.target.value)}
      />
      <label>Fecha de Nacimiento:</label>
      <BirthdateInput
        value={birthdate}
        modifier={(value) => setPropertyUser("birthdate", value)}
      />
      <label>Telefono Celular</label>
      <input
        type="tel"
        className="form-control mb-3"
        value={phone}
        onChange={(e) => setPropertyUser("phone", e.target.value)}
      />
      <div className="row mt-4">
        <div className="col col-md-6">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
        <div className="col col-md-6 text-end">
          <button
            type="button"
            className="btn btn-link text-light"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
