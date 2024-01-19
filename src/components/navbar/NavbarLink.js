import React from "react";
import IconItem from "../global/IconItem";
import { navigate } from "@reach/router";

const NavbarLink = ({ icon, name, link, action }) => {
  const handleClick = () => {
    if (typeof action === "function") {
      return action();
    }
    navigate(link);
  };

  return (
    <button
      onClick={handleClick}
      data-bs-dismiss="offcanvas"
      className="btn btn-clear d-block px-0 py-0 no-decoration text-dark"
    >
      <IconItem icon={icon} name={name} />
    </button>
  );
};

export default NavbarLink;
