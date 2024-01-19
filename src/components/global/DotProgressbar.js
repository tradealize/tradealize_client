import React from "react";

const DotProgressBar = ({ data }) => {
  const renderBars = () => {
    if (Array.isArray(data)) {
      return data.map(({ progress }, index) => (
        <div className="col" key={index}>
          <div className="progress-dot"></div>
          <div
            className="progress"
            role="progressbar"
            aria-label="Segment one"
            aria-valuenow="15"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: 3 }}
          >
            <div
              className="progress-bar bg-primary"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ));
    }
    if (typeof data === "object") {
      return (
        <div
          className="progress"
          role="progressbar"
          aria-label="Segment one"
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${data.progress}%` }}
        >
          <div className="progress-bar"></div>
        </div>
      );
    }
  };

  return (
    <div className="row position-relative pt-3 mt-1 mb-0">{renderBars()}</div>
  );
};

export default DotProgressBar;
