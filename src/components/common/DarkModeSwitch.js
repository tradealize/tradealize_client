import React from "react";
import ReactSwitch from "react-switch";

const DarkModeSwitch = ({ darkMode, setDarkMode }) => {
  return (
    <div className="d-flex align-items-center">
      <span className="d-inline-block me-3">
        <i className={`fa fa-sun small ${darkMode ? "text-white" : ""}`}></i>
      </span>
      <ReactSwitch
        checked={darkMode}
        onChange={(checked) => setDarkMode(checked)}
      />
      <span className="d-inline-block ms-3">
        <i className={`fa fa-moon small ${darkMode ? "text-white" : ""}`}></i>
      </span>
    </div>
  );
};

export default DarkModeSwitch;
