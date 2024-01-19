import moment from "moment";
import React from "react";

const DueDate = ({ start_date, end_date }) => {
  const renderEndTime = (start_date, end_date) => {
    if (end_date && end_date !== null) {
      end_date = moment(end_date).local();
      start_date = moment(start_date).local();
      if (end_date.isValid() && !start_date.isSame(end_date)) {
        return end_date.format("HH:mm");
      }
    }
    if (start_date !== null) {
      return moment(start_date).local().format("HH:mm");
    }
  };

  const renderEndDate = (start_date, end_date) => {
    if (end_date && end_date !== null) {
      end_date = moment(end_date).local();
      start_date = moment(start_date).local();
      if (
        end_date.isValid() &&
        start_date.format("YYYY-MM-DD") !== end_date.format("YYYY-MM-DD")
      ) {
        return ` - ${end_date.format("MMM Do YYYY")}`;
      }
    }
  };

  const isDateValid = (date) => {
    date = moment(date);
    return date.isValid();
  };

  const renderDate = (date) => {
    if (isDateValid(date)) {
      return moment(date).format("MMM Do YYYY");
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-8">
          <i className="fa fa-calendar text-primary me-2"></i>{" "}
          {renderDate(start_date)}
          {renderEndDate(start_date, end_date)}
        </div>
        <div className="col-4">
          <i className="fa fa-clock text-primary me-2"></i>{" "}
          {renderEndTime(start_date, end_date)}
        </div>
      </div>
    </div>
  );
};

export default DueDate;
