import { AppConfigContext } from "../context/AppConfigContext";
import React, { useContext } from "react";
import parse from "html-react-parser";
import { Link } from "@reach/router";
import { getValue } from "../utils";
import "../css/landing.css";

const Landing = () => {
  const appconfig = useContext(AppConfigContext);
  const {
    landing_bg_className,
    landing_text_className,
    high_ticket_offer_name,
  } = appconfig;

  const renderTextValue = (key) => {
    const value = getValue(appconfig, key);
    if (value && value !== null) {
      if (String(value).includes("<")) {
        return parse(value);
      }
      return value;
    }
  };

  return (
    <div
      id="landing"
      className={`container-fluid py-5 ${landing_bg_className}`}
    >
      <div className="container position-relative">
        <nav
          id="navbar"
          className={`navbar px-3 br-10 w-100 my-4 align-items-center mb-2 py-2 shadow ${landing_bg_className}`}
        >
          <Link to="/auth" className="navbar-brand">
            <img
              src={getValue(appconfig, "landing_logo_src")}
              alt="Logo"
              style={{ height: 60, width: "auto", objectFit: "contain" }}
              className="d-inline-block"
            />{" "}
          </Link>
          <Link to="/auth" className="btn btn-primary">
            Get Started
          </Link>
        </nav>
        <div className="row pt-5 hero-section align-items-center">
          <div className="col-12 col-md-12 col-lg-7 mb-3">
            <h1 className={`${landing_text_className} display-2 bold`}>
              {renderTextValue("title")}
            </h1>
            <p className={`${landing_text_className} h3 fw-normal`}>
              {renderTextValue("description")}
            </p>
            <Link to="/auth" className="btn btn-lg px-5 py-2 mt-3 btn-primary">
              Get Started
            </Link>
          </div>
          <div className="col-12 col-md-12 col-lg-5 px-0 mb-3 position-relative">
            <img
              src={getValue(appconfig, "hero_img")}
              className="mw-100 w-100 d-block m-auto"
            />
          </div>
        </div>
      </div>

      {getValue(appconfig, "about") && (
        <div className="container mb-4">
          <div className={`card p-4 text-large ${landing_bg_className}`}>
            <h2 className={`${landing_text_className}`}>About Us</h2>
            <p className={`${landing_text_className}`}>
              {renderTextValue("about")}
            </p>
            <p className={`${landing_text_className}`}>
              {renderTextValue("call_to_action")}
            </p>
          </div>
        </div>
      )}

      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-4">
            <div className={`card mb-3 p-4 shadow ${landing_bg_className}`}>
              <div className="card-body p-4">
                {getValue(appconfig, "features_icons_enabled", "boolean") && (
                  <i className="fas fa-2x text-gradient mb-4 fa-camera"></i>
                )}
                <h3 className={`${landing_text_className} bold`}>
                  {renderTextValue("feature1_title")}
                </h3>
                <p className={`${landing_text_className}`}>
                  {renderTextValue("feature1_description")}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
            <div className={`card mb-3 p-4 shadow ${landing_bg_className}`}>
              <div className="card-body p-4">
                {getValue(appconfig, "features_icons_enabled", "boolean") && (
                  <i className="fas fa-2x text-gradient mb-4 fa-magic"></i>
                )}
                <h3 className={`${landing_text_className} bold`}>
                  {renderTextValue("feature2_title")}
                </h3>
                <p className={`${landing_text_className}`}>
                  {renderTextValue("feature2_description")}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12 col-lg-4">
            <div className={`card mb-3 p-4 shadow ${landing_bg_className}`}>
              <div className="card-body p-4">
                {getValue(appconfig, "features_icons_enabled", "boolean") && (
                  <i className="fas fa-2x text-gradient mb-4 fa-shapes"></i>
                )}
                <h3 className={`${landing_text_className} bold`}>
                  {renderTextValue("feature3_title")}
                </h3>
                <p className={`${landing_text_className}`}>
                  {renderTextValue("feature3_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
