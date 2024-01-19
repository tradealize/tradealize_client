import React, { useState, useEffect } from "react";
import moment from "moment";

const PanelTitleDate = ({ title, callback }) => {
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().startOf("month").add(1, "month").format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (typeof callback === "function") {
      callback(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <div className="row mx-0 align-items-center mb-3 pb-2 border-bottom">
      <div className="col-12 col-md-6 px-0 mb-2">
        <h1 className="h2 bold mb-0">{title}</h1>
      </div>
      <div className="col-12 col-md-6 px-0 text-end mb-2">
        <div className="row">
          <div className="col-6">
            <input
              type="date"
              value={startDate}
              className="form-control bg-white"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-6">
            <input
              type="date"
              value={endDate}
              className="form-control bg-white"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelTitleDate;
