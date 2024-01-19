import { Link } from "@reach/router";
import React, { useContext } from "react";
import useTranslations from "../../hooks/useTranslations";
import { AuthContext } from "../../context/AuthContext";

const UserMenu = () => {
  const { user, signOut } = useContext(AuthContext);
  const translations = useTranslations();
  return (
    <div>
      <button
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="btn small mt-2 w-100 text-left text-dark px-3"
      >
        <div className="row">
          <div className="col-2">
            <i className="fas fa-user"></i>
          </div>
          <div className="col-10 d-flex justify-content-between">
            {user.name}
            <span
              className="dropdown-toggle"
              style={{ marginInlineEnd: "10%" }}
            ></span>
          </div>
        </div>
      </button>
      <ul
        className="dropdown-menu bg-white border"
        aria-labelledby="navbarDropdown"
      >
        <li className="my-1">
          <Link
            to="/settings"
            className="dropdown-item hover-success text-dark"
          >
            <div className="d-flex">
              <div className="col-2 me-2">
                <i className="fa fa-cog"></i>
              </div>
              <div className="col-10">{translations.menu.settings}</div>
            </div>
          </Link>
        </li>
        <li className="my-1">
          <button
            className="dropdown-item w-100 btn-sm hover-danger text-danger"
            onClick={signOut}
          >
            <div className="d-flex">
              <div className="col-2 me-2">
                <i className="fa fa-sign-out-alt"></i>
              </div>
              <div className="col-10">{translations.menu.logout}</div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
