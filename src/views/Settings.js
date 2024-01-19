import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";
import ReactSwitch from "react-switch";
import { Link } from "@reach/router";
import ToggleLanguage from "../components/translations/ToggleLanguage";

const Settings = () => {
  const { user, updateUser, setPropertyUser } = useContext(AuthContext);
  const { setSelected } = useContext(MenuContext);

  useEffect(() => {
    setSelected("Settings");
  }, []);

  useEffect(() => {
    //updateUser({ ...user });
  }, [user]);

  return (
    <div className="container py-3">
      <h1 className="mb-3">Settings</h1>
      <p>
        You need a valid OpenAI API Key to use BemodoAI Avatars.{" "}
        <Link to="/tutorials/1">Learn more.</Link>{" "}
      </p>
      <div className="card p-3 shadow-sm">
        <div className="row my-3 align-items-center">
          <div className="col-12 col-md-6">
            <h4>Select Language</h4>
          </div>
          <div className="col-12 col-md-6">
            <ToggleLanguage />
          </div>
        </div>
        <div className="row my-3 align-items-center">
          <div className="col-12 col-md-6">
            <h4>Dark Mode</h4>
          </div>
          <div className="col-12 col-md-6">
            <ReactSwitch
              checked={user.dark_mode}
              onChange={(checked) =>
                updateUser({ ...user, dark_mode: checked })
              }
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={() => updateUser(user)}
        >
          <i className="fa fa-save me-2"></i> Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
