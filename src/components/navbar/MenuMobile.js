import React, { useRef, useContext } from "react";
import { CapacitorContext } from "../../context/CapacitorContext";
import { MenuContext } from "../../context/MenuContext";
import { AuthContext } from "../../context/AuthContext";
import { navigate } from "@reach/router";
import { getValue, hasNotch } from "../../utils";
import { AppConfigContext } from "../../context/AppConfigContext";

const MenuMobile = () => {
  const toggleMenuButton = useRef(null);

  const { signOut } = useContext(AuthContext);
  const appconfig = useContext(AppConfigContext);
  const { device, platform } = useContext(CapacitorContext);
  const { userSettingTabs, selected } = useContext(MenuContext);

  const renderHeader = () =>
    selected && (
      <div className="d-inline">
        <span className="ms-2">{selected}</span>
      </div>
    );

  const renderMenuButton = () =>
    platform === "web" && (
      <button
        type="button"
        ref={toggleMenuButton}
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    );

  return (
    <nav
      style={{ top: 32 }}
      className={`navbar navbar-expand-lg navbar-light bg-white text-dark fixed-top border-bottom px-3 show-mobile ${
        hasNotch(device) ? "navbar-notch" : ""
      }`}
    >
      <div className="col-12">
        <div
          style={{ paddingTop: hasNotch(device) ? 50 : 0 }}
          className="row mx-0 align-items-center"
        >
          <div className="col-6 px-0">
            <div className="navbar-brand py-0 me-auto">
              {" "}
              <img
                src={getValue(appconfig, "landing_logo_src")}
                className="d-inline-block"
                style={{ maxWidth: 45 }}
                alt="Logo"
              />{" "}
              {renderHeader()}
            </div>
          </div>
          <div className="col-6 pe-0 text-end">{renderMenuButton()}</div>
        </div>
        <div className="collapse navbar-collapse mw-100 pt-3" id="navbarNav">
          <nav className="navbar-nav me-auto text-start">
            <div
              className="p-2 text-dark hover-accent no-decoration border-top border-bottom"
              onClick={() => {
                toggleMenuButton.current.click();
                navigate("/conversations");
              }}
            >
              <div className="row w-100">
                <div className="col-1">
                  <img
                    src={getValue(appconfig, "landing_logo_src")}
                    alt="Logo"
                    style={{ maxWidth: 25, marginLeft: -6 }}
                    className="d-inline-block"
                  />
                </div>
                <div className="col-11">Strategies</div>
              </div>
            </div>
            <button
              className="btn btn-sm text-start text-danger mx-2 px-0 my-3"
              onClick={signOut}
            >
              <i className="fas fa-sign-out-alt fa-flip-horizontal me-2" /> Log
              Out
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default MenuMobile;
