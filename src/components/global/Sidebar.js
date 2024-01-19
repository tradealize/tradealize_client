import { Link } from "@reach/router";
import React, { useContext } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { formatMonto, getValue } from "../../utils";
import { AuthContext } from "../../context/AuthContext";
import { AppConfigContext } from "../../context/AppConfigContext";
import useTranslations from "../../hooks/useTranslations";
import UserMenu from "../menu/UserMenu";
import AdminMenu from "../menu/AdminMenu";
import AdminAnalyticsMenu from "../menu/AdminAnalyticsMenu";
import { getTabs } from "../../utils/menu";

const Sidebar = () => {
  useDarkMode();

  const { user } = useContext(AuthContext);
  const appconfig = useContext(AppConfigContext);
  const { fetch_icon_url } = appconfig;

  const translations = useTranslations();
  const { lang } = translations;

  const renderAdmin = () => {
    if (user.staff && user.staff !== null) {
      return (
        <div>
          <AdminMenu />
          <AdminAnalyticsMenu />
        </div>
      );
    }
  };

  const renderTabs = () => {
    const tabs = getTabs(appconfig);
    if (Array.isArray(tabs)) {
      return tabs.map((tab) => (
        <Link
          to={tab.link}
          key={tab.link}
          className="btn small w-100 my-2 text-dark hover-success text-left"
        >
          <div className="row">
            <div className="col-2">
              <i className={tab.icon}></i>
            </div>
            <div className="col-10">{tab.name[lang]}</div>
          </div>
        </Link>
      ));
    }
  };

  const renderFetch = () => {
    return (
      <div className="row">
        <div className="col-2">
          <i className="fa fa-comments" />
        </div>
        <div className="col-10">Strategies</div>
      </div>
    );
  };

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
          {renderFetch()}
        </Link>
        {renderTabs()}
        {renderAdmin()}
        <UserMenu />
      </div>
    </div>
  );
};

export default Sidebar;
