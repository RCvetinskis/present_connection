import React from "react";
import range from "../utilities/rangeFunction";

import PaginationItem from "./PaginationItem";
const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  // counts pages
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination   justify-content-end">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
    </ul>
  );
};

export default Pagination;
