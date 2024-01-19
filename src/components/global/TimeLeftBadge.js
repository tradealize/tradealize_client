import moment from "moment";
import React from "react";

const TimeLeftBadge = ({ date }) => {
  const getDaysLeft = () => {
    const diff = moment(date).utc().diff(moment().local(), "days");
    if (diff === 0) {
      return "Today";
    }
    return `${diff} days left`;
  };

  return (
    <span className="badge fw-light rounded-pill bg-dark mb-2 pe-2">
      <i className="fa fa-clock me-1"></i>
      {getDaysLeft()}
    </span>
  );
};

export default TimeLeftBadge;
