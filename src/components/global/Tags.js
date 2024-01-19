import React from "react";

const Tags = ({ tags }) => {
  const renderTags = () => {
    if (tags !== null) {
      tags = String(tags)
        .split(",")
        .filter(
          (tag) => tag !== "undefined" && tag !== null && tag !== undefined
        );
      return tags.map((tag) => (
        <span key={tag} className="badge badge-pill bg-accent m-1 mb-1">
          {tag}
        </span>
      ));
    }
  };

  return <div className="d-inline-block">{renderTags()}</div>;
};

export default Tags;
