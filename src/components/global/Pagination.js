import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
  size,
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination d-flex mb-0 align-items-center overflow-hidden">
        <li>
          <button
            className="btn btn-round bg-white border"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <i className="fa fa-chevron-left" />
          </button>
        </li>
        {size !== "sm" ? (
          pages
            .filter((page) => page < 5)
            .map((page) => (
              <li key={page}>
                <button
                  className={`btn ms-2 ${currentPage === page ? "btn-primary" : "bg-white border"
                    }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))
        ) : (
          <li key={currentPage}>
            <button className="btn ms-2 btn-primary">{currentPage}</button>
          </li>
        )}
        {pages.length > 4 && size !== "sm" && (
          <li key={currentPage > 4 ? currentPage : "more"}>
            <button className="btn ms-2 btn-primary">
              {currentPage > 4 ? currentPage : "..."}
            </button>
          </li>
        )}
        <li>
          <button
            className="btn btn-round bg-white border ms-2"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <i className="fa fa-chevron-right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
