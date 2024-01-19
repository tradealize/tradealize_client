import React from "react";
import { getValue } from "../../utils";

const UserMexicanData = ({ user_data, setPropertyUserData }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="curp" className="form-label">
            CURP
          </label>
          <input
            type="text"
            id="curp"
            name="curp"
            className="form-control mb-3"
            value={getValue(user_data, "curp")}
            onChange={(event) =>
              setPropertyUserData("curp", event.target.value)
            }
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="rfc" className="form-label">
            RFC:
          </label>
          <input
            type="text"
            id="rfc"
            name="rfc"
            className="form-control mb-3"
            value={getValue(user_data, "rfc")}
            onChange={(event) => setPropertyUserData("rfc", event.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default UserMexicanData;
