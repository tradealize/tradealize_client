import React from "react";

const SelectSheet = ({ sheetName, resetSheet, sheetNames, setSheetName }) => {
  const renderSelectSheet = () => {
    if (sheetName !== "") {
      return (
        <div className="card p-3 shadow my-3">
          <div className="container-fluid px-0">
            <h5 className="bold">Selected Sheet</h5>
            <p className="mb-1">{sheetName}</p>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={resetSheet}
            >
              <i className="fa fa-edit"></i> Change Sheet
            </button>
          </div>
        </div>
      );
    }
    if (Array.isArray(sheetNames)) {
      return (
        <div className="card p-3 shadow my-3">
          <label>Sheet</label>
          <select
            value={sheetName}
            className="form-control"
            onChange={(e) => setSheetName(e.target.value)}
          >
            {[
              <option key="null" value="">
                Select a Sheet
              </option>,
              ...sheetNames.map((sheetName) => (
                <option key={sheetName} value={sheetName}>
                  {sheetName}
                </option>
              )),
            ]}
          </select>
        </div>
      );
    }
  };
  return <div>{renderSelectSheet()}</div>;
};

export default SelectSheet;
