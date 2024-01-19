import { Link } from "@reach/router";
import React from "react";

const TutorialCard = ({ tutorial }) => {
  return (
    <div key={tutorial.tutorial_id} className="col-md-6 col-lg-4 mb-2">
      <div className="card shadow-sm">
        <img
          src={tutorial.thumbnail}
          style={{ borderRadius: "10px 10px 0px 0px" }}
          className="mw-100 w-100 d-block m-auto"
        />
        <div className="p-3">
          <h3>
            #{tutorial.order}- {tutorial.name}
          </h3>
          <Link
            to={`/tutorials/${tutorial.order}`}
            className="btn btn-round btn-primary"
          >
            <i className="fa fa-play-circle me-1"></i> Play
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;
