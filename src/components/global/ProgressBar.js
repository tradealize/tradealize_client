import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div
      className="progress mb-2"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ height: 5 }}
    >
      <div
        className="progress-bar bg-primary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
export default ProgressBar;
