import React, { useRef, useContext, useState } from "react";
import { CapacitorContext } from "../../context/CapacitorContext";
import { MenuContext } from "../../context/MenuContext";
import { AuthContext } from "../../context/AuthContext";
import { navigate } from "@reach/router";
import bunny from "../../assets/bunny.png";
import { hasNotch } from "../../utils";
import useTranslations from "../../hooks/useTranslations";
import { getTabs, getTools } from "../../utils/menu";
import { AppConfigContext } from "../../context/AppConfigContext";

const MenuMobile = () => {
  const toggleMenuButton = useRef(null);

  const translations = useTranslations();
  const { lang } = translations;

  const { signOut } = useContext(AuthContext);
  const appconfig = useContext(AppConfigContext);
  const {
    userSettingTabs,
    organizationTabs,
    toolsTabs,
    adminTabs,
    tabs,
    selected,
  } = useContext(MenuContext);
  const { device, platform } = useContext(CapacitorContext);

  const [showSubMenuTabs, setShowSubMenuTabs] = useState({});

  const toggleTabs = (categoryKey) => {
    setShowSubMenuTabs((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

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

  const renderTabs = (tabsItems) =>
    tabsItems.map((tab) => (
      <div
        className="p-2 text-dark hover-accent no-decoration border-top border-bottom"
        key={tab.link}
        onClick={() => {
          toggleMenuButton.current.click();
          navigate(tab.link);
        }}
      >
        <div className="row w-100">
          <div className="col-1">
            <i className={tab.icon} />
          </div>
          <div className="col-11"> {tab.name[lang]}</div>
        </div>
      </div>
    ));

  const renderSubMenuTabs = (tabs) => {
    return Object.keys(tabs).map((categoryKey) => {
      const category = tabs[categoryKey];
      const isOpen = showSubMenuTabs[categoryKey] || false;
      if (category.name === "Tools") {
        category.tabs = getTools(appconfig);
      }
      return (
        <div
          key={category.name}
          style={{ paddingLeft: "12px" }}
          className="text-dark hover-accent no-decoration border-top border-bottom"
        >
          <button
            className="btn text-start text-dark d-flex w-100 ps-2"
            onClick={() => toggleTabs(categoryKey)}
          >
            <div className="col-1">
              <i className={category.icon} />
            </div>
            <div className="col-11 d-flex justify-content-between">
              {" "}
              {category.name}{" "}
              <i className="fa fa-caret-down" aria-hidden="true"></i>{" "}
            </div>
          </button>
          {isOpen && renderTabs(category.tabs)}
        </div>
      );
    });
  };

  const renderNormalTabs = (tabs) => renderTabs(tabs);
  const renderHomeButton = () =>
    platform !== "web" && (
      <button className="btn me-1" onClick={() => navigate("/")}>
        <i className="fa fa-home"></i>
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
                src={bunny}
                alt="Logo"
                style={{ maxWidth: 45 }}
                className="d-inline-block"
              />{" "}
              {renderHeader()}
            </div>
          </div>
          <div className="col-6 pe-0 text-end">
            {renderHomeButton()}
            {renderMenuButton()}
          </div>
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
                    src={bunny}
                    alt="Logo"
                    style={{ maxWidth: 25, marginLeft: -6 }}
                    className="d-inline-block"
                  />
                </div>
                <div className="col-11">Fetch</div>
              </div>
            </div>
            {renderNormalTabs(getTabs(appconfig))}
            {/* {renderSubMenuTabs(organizationTabs)} */}
            {renderSubMenuTabs(toolsTabs)}
            {renderSubMenuTabs(adminTabs)}
            {renderSubMenuTabs(userSettingTabs)}
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
