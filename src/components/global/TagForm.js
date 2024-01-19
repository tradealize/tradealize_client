import React, { useState, useEffect } from "react";

const TagForm = ({ tagValues, modifier }) => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [prevTagValues, setPrevTagValues] = useState(null);

  useEffect(() => {
    if (tagValues === null && prevTagValues != null) {
      setTags([]);
    }

    if (tagValues) {
      setPrevTagValues(tagValues);
      setTags(tagValues.split(","));
    }
  }, [tagValues, prevTagValues]);

  useEffect(() => {
    modifier(tags.join(","));
  }, [tags]);

  const handleRemoveTag = (tag) => {
    let current = [...tags];
    const index = current.indexOf(tag);
    if (index !== -1) {
      current.splice(index, 1);
    }
    setTags(current);
  };

  const handleKeyPress = (e) => {
    if (e.key === ",") {
      let current = [...tags];
      current.push(currentTag.replace(",", ""));
      setCurrentTag("");
      setTags(current);
    }
  };

  const handleTagChange = (e) => {
    if (e.key !== ",") {
      setCurrentTag(e.target.value);
    }
  };

  const renderTags = () => {
    if (tags.length < 1 || !tags) return;

    return tags.map((tag, index) => (
      <span className="badge badge-pill bg-accent me-2" key={index}>
        {tag}{" "}
        <button
          onClick={() => handleRemoveTag(tag)}
          className="btn btn-sm px-1 py-0"
          type="button"
        >
          <i className="fa fa-times" />
        </button>
      </span>
    ));
  };
  return (
    <div>
      <label>
        Tags <span className="small">(Separate with commas)</span>
      </label>
      <div className="d-block my-2"> {renderTags()}</div>
      <input
        type="text"
        value={currentTag}
        onKeyUp={handleKeyPress}
        onChange={handleTagChange}
        className="form-control mb-3"
      />
    </div>
  );
};

export default TagForm;
