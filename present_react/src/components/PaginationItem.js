import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";
import ApiRoutes from "../utilities/ApiRoutes";
import mainContext from "../context/MainContext";
const PaginationItem = ({ page, currentPage, onPageChange }) => {
  const { setCars } = useContext(mainContext);

  useEffect(() => {
    // receives rows per page from backend
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `${
            ApiRoutes.API_URL_GET_ALL_CARS
          }?page=${currentPage}&rowsPerPage=${10}`
        );
        setCars(res.data);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetchCars();
  }, [currentPage]);

  const liClasses = classNames({
    "page-item  ": true,
    active: page === currentPage,
  });

  return (
    <li className={liClasses} onClick={() => onPageChange(page)}>
      <span className="page-link"> {page}</span>
    </li>
  );
};

export default PaginationItem;
