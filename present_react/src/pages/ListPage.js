import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import mainContext from "../context/MainContext";
import Pagination from "../components/Pagination";

const ListPage = () => {
  const { getCars, carsLength } = useContext(mainContext);
  // state for pagination
  const [currentPage, setCurrentPage] = useState(1);

  const nav = useNavigate();

  return (
    <div className="list-page">
      <Helmet>
        <title>Cars List</title>
      </Helmet>
      <h1 className="text-center mb-3">Cars List</h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Cars</th>
            <th>Car Brand</th>
            <th>Car Model</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {getCars.map((car, i) => (
            <tr onClick={() => nav(`/details/${car.carId}`)} key={i}>
              <td>{i + 1}</td>
              <td className="text-capitalize">{car.carBrand}</td>
              <td className="text-capitalize"> {car.carModel}</td>
              <td>{car.carYear}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        total={carsLength}
        limit={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ListPage;
