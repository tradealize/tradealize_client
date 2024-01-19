import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserMexicanData from "./UserMexicanData";
import ReactSwitch from "react-switch";
import { getValue } from "../../utils";
import { ModalContext } from "../../context/ModalContext";

const UserDataForm = ({ readID, hideButtons, saveAction, handleCancel }) => {
  const [sameAddress, setSameAddress] = useState(true);
  const { user, user_data, setUserData, updateUser, setPropertyUserData } =
    useContext(AuthContext);

  const { clearModal } = useContext(ModalContext);

  useEffect(() => {
    if (user_data === null) {
      setUserData(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof saveAction === "function") {
      user_data.sameAddress = sameAddress;
      saveAction(user_data);
    } else {
      updateUser(user_data, clearModal);
    }
  };

  const renderMexicanData = () => {
    if (getValue(user_data, "nationality") === "Mexicana") {
      return (
        <UserMexicanData
          user_data={user_data}
          setPropertyUserData={setPropertyUserData}
        />
      );
    }
  };

  const renderSwitch = () => {
    if (readID) {
      return (
        <div className="col-12">
          <label htmlFor="rfc" className="form-label">
            <ReactSwitch
              checked={sameAddress}
              onChange={setSameAddress}
              className="me-2"
            />
            Mi domicilio personal es el mismo que en mi identificación
          </label>
        </div>
      );
    }
  };

  const renderButtons = () => {
    if (!hideButtons) {
      return (
        <div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-link text-muted w-100 px-0"
          >
            Cancel
          </button>
        </div>
      );
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={getValue(user_data, "name")}
          onChange={(event) => setPropertyUserData("name", event.target.value)}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="last_name" className="form-label">
          Apellidos
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          className="form-control"
          value={getValue(user_data, "last_name")}
          onChange={(event) =>
            setPropertyUserData("last_name", event.target.value)
          }
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={getValue(user_data, "email")}
          onChange={(event) => setPropertyUserData("email", event.target.value)}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="phone" className="form-label">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control"
          value={getValue(user_data, "phone")}
          onChange={(event) => setPropertyUserData("phone", event.target.value)}
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="birthdate" className="form-label">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          className="form-control"
          value={getValue(user_data, "birthdate")}
          onChange={(event) =>
            setPropertyUserData("birthdate", event.target.value)
          }
          required
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="curp" className="form-label">
          Nacionalidad
        </label>
        <select
          className="form-control mb-3"
          value={getValue(user_data, "nationality")}
          onChange={(e) => setPropertyUserData("nationality", e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="Mexicana">Mexicana</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      {renderMexicanData()}
      {renderSwitch()}
      {renderButtons()}
    </form>
  );
};

export default UserDataForm;
