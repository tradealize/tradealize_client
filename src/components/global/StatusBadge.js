import moment from "moment";
import React from "react";

const StatusBadge = ({ cancelledAt, updatedAt, status }) => {
  return (
    <div className="text-capitalize">
      {status === "revoked" ? (
        <span className="badge badge-pill bg-danger">Revoked</span>
      ) : status === "cancelled" ? (
        <span className="badge badge-pill bg-danger">
          Cancelled on{" "}
          {moment(cancelledAt !== null ? cancelledAt : updatedAt)
            .utc()
            .local()
            .format("MMM Do YYYY HH:mm")}
        </span>
      ) : status === "active" || status === "succeeded" ? (
        <span className="badge badge-pill bg-success">{status}</span>
      ) : status === "completed" ? (
        <span className="badge badge-pill bg-success">Completed</span>
      ) : status === "pending" ? (
        <span className="badge badge-pull bg-warning text-dark">Pending</span>
      ) : status === "failed" ? (
        <span className="badge badge-pull bg-danger text-white">Failed</span>
      ) : (
        <span className="badge badge-pull bg-secondary text-capitalize">
          {status}
        </span>
      )}
    </div>
  );
};
export default StatusBadge;
