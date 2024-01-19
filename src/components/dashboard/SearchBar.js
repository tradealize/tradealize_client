import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="search-addon">
        <i className="fa fa-search text-primary"></i>
      </span>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        className="form-control"
        alia-aria-describedby="search-addon"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
