import React, { useState, useContext } from "react";
import { StaffContext } from "../../context/StaffContext";
import { hideModal } from "../../utils";

const EditUserForm = ({ user }) => {
  const [role, setRole] = useState("admin");

  const { updateStaff } = useContext(StaffContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStaff(user.staff_id, role);
  };

  return (
    <form onSubmit={handleSubmit}>
      {user !== null && <p>{user.user.email}</p>}
      <label>Rol</label>
      <select
        className="form-control mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
      </select>
      <div className="row mt-3">
        <div className="col-6">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
        <div className="col-6 text-right">
          <button
            type="button"
            onClick={hideModal}
            className="btn btn-link text-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserForm;
