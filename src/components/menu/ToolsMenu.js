import React, { useContext } from "react";
import { Link } from "@reach/router";
import { MenuContext } from "../../context/MenuContext";
import { AppConfigContext } from "../../context/AppConfigContext";
import { getTools } from "../../utils/menu";

const ToolsMenu = () => {
  const { toolsTabs } = useContext(MenuContext);
  const appconfig = useContext(AppConfigContext);

  const toolsMenu = getTools(appconfig);

  return (
    <div>
      <button
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="btn small my-2 w-100 text-left text-dark px-3"
      >
        <div className="row">
          <div className="col-2">
            <i className={toolsTabs.tools.icon}></i>
          </div>
          <div className="col-10 d-flex justify-content-between">
            {toolsTabs.tools.name}
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
        {toolsMenu.map((tab) => (
          <li key={tab.link} className="my-1">
            <Link
              to={tab.link}
              className="dropdown-item hover-success text-dark"
            >
              <div className="d-flex">
                <div className="col-2 me-2">
                  <i className={tab.icon}></i>
                </div>
                <div className="col-10">{tab.name.en}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsMenu;