import React, { useContext, useEffect } from "react";
import { CapacitorContext } from "../../context/CapacitorContext";
import { AuthContext } from "../../context/AuthContext";
import { MenuContext } from "../../context/MenuContext";
import { useLocation } from "@reach/router";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  const { platform, setupStatusBar } = useContext(CapacitorContext);

  const { menus, selected } = useContext(MenuContext);

  const { user, signOut } = useContext(AuthContext);

  const location = useLocation();

  const renderTask = () => {
    if (user && user !== null) {
      if (user.user_type_id >= 3) {
        return <button className="btn btn-light w-100">Add Task</button>;
      }
    }
  };

  const renderUser = () => {
    if (user && user !== null) {
      return <NavbarLink link="/profile" name={user.name} icon="user" />;
    }
  };

  const renderMenu = () => {
    if (Array.isArray(menus) && user && user !== null) {
      let menusRender = menus;
      menusRender = menusRender.filter(
        (menu) =>
          (!menu.level || menu.level <= user.user_type_id) &&
          (!menu.base_url || location.pathname.includes(menu.base_url))
      );
      return menusRender.map((menu, index) => (
        <div key={`${menu.name}-${index}`} className="mb-3">
          <p className="mb-2 text-muted">{menu.name}</p>
          {menu.items.map((item, itemIndex) => (
            <NavbarLink
              key={`${item.name}-${index}-${itemIndex}`}
              scoped={menu.scoped}
              {...item}
            />
          ))}
        </div>
      ));
    }
  };

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
