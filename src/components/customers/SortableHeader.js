import React from "react";

const SortableHeader = ({
  direction,
  setDirection,
  setSort,
  label,
  column,
  selected,
}) => {
  return (
    <td
      onClick={() => {
        setSort(column);
        setDirection(direction === "ASC" ? "DESC" : "ASC");
      }}
      className={selected === column ? "bg-accent" : "text-dark"}
    >
      {label}
      <i
        className={`ms-2 fa fa-chevron-${direction === "DESC" ? "down" : "up"}`}
      ></i>
    </td>
  );
};

export default SortableHeader;
