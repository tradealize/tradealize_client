import React from "react";
import { S3_ENDPOINT } from "../../utils";

const UserIdentity = ({ selected, user_identity, handleSelect }) => {
  const { front, back } = user_identity;

  const renderFront = () => {
    if (front && front !== null) {
      return (
        <div className="col-6">
          <label className="bold mb-2">Frente</label>
          <img
            src={`${S3_ENDPOINT}/${front.name}.${front.type}`}
            className="mw-100 w-100"
          />
        </div>
      );
    }
  };

  const renderBack = () => {
    if (back && back !== null) {
      return (
        <div className="col-6">
          <label className="bold mb-2">Reverso</label>
          <img
            src={`${S3_ENDPOINT}/${back.name}.${back.type}`}
            className="mw-100 w-100"
          />
        </div>
      );
    }
  };
  const renderSelect = () => {
    if (typeof handleSelect === "function") {
      return (
        <div>
          <label>
            <input
              type="radio"
              className="me-2"
              checked={selected === user_identity.user_identity_id}
              onChange={(e) => {
                if (e.target.checked) handleSelect(user_identity);
              }}
            />
            Elegir esta identificación
          </label>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid px-0">
      {renderSelect()}
      <div className="row">
        {renderFront()}
        {renderBack()}
      </div>
    </div>
  );
};

export default UserIdentity;
