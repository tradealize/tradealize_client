import { Link } from "@reach/router";
import React, { useContext } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { getValue } from "../../utils";
import { AuthContext } from "../../context/AuthContext";
import { AppConfigContext } from "../../context/AppConfigContext";
import UserMenu from "../menu/UserMenu";

const Sidebar = () => {
  useDarkMode();

  const { user } = useContext(AuthContext);
  const appconfig = useContext(AppConfigContext);

  return (
    <div
      className="sidebar bg-white d-flex flex-column 
      overflow-y-auto"
    >
      <img
        src={
          getValue(user, "dark_mode", true)
            ? getValue(appconfig, "dark_logo")
            : getValue(appconfig, "light_logo")
        }
        style={{ maxWidth: "120px" }}
        className="my-4 d-block w-100 mx-auto"
        alt="logo"
      />
      <div className="sidebar-menu">
        <Link to="/" className="btn small w-100 my-2 text-dark text-left">
          <div className="row">
            <div className="col-2">
              <i className="fa fa-comments" />
            </div>
            <div className="col-10">Strategies</div>
          </div>
        </Link>
        <UserMenu />
      </div>
    </div>
  );
};

export default Sidebar;
