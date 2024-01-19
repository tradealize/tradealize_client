import React, { useEffect, useContext } from "react";
import { UserTypeContext } from "../../context/UserTypeContext";

const SelectUserType = ({ value, modifier }) => {
  const { user_types, getUserTypes } = useContext(UserTypeContext);
  useEffect(() => {
    getUserTypes();
  }, []);
  const renderUserTypes = () => {
    if (Array.isArray(user_types)) {
      return user_types.map((user_type) => (
        <option
          className="text-capitalize"
          key={user_type.user_type_id}
          value={user_type.user_type_id}
        >
          {user_type.name}
        </option>
      ));
    }
  };
  return (
    <div>
      <label>Minimum Level</label>
      <select
        value={value}
        className="form-control mb-3"
        onChange={(e) => modifier(e.target.value)}
      >
        {renderUserTypes()}
      </select>
    </div>
  );
};

export default SelectUserType;
