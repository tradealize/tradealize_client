import React, { useContext, useEffect } from "react";
import { CapacitorContext } from "../../context/CapacitorContext";
import { AuthContext } from "../../context/AuthContext";
import { MenuContext } from "../../context/MenuContext";
import { useLocation } from "@reach/router";

const Navbar = () => {
  const { platform, setupStatusBar } = useContext(CapacitorContext);

  const { menus } = useContext(MenuContext);

  const { user } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    if (platform !== null && platform !== "web") {
      setupStatusBar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform]);

  return (
    <nav
      id="navbar"
      className="navbar navbar-light shadow-sm bg-white align-items-center mb-2 py-2"
    >
      <div className="container">
        <h2 className="mb-0 bold">Menu</h2>
        <button className="btn border btn-light">
          <i className="fa fa-user me-2"></i> {user.name}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
