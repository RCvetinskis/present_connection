import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import mainContext from "./context/MainContext";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import NewRecordForm from "./pages/NewRecordForm";
import Navigation from "./components/Navigation";
import ApiRoutes from "./utilities/ApiRoutes";
import Loader from "./components/Loader";

function App() {
  const [getCars, setCars] = useState([]);
  const [carsLength, setCarsLength] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // state to check if new car is added for useffect
  const [carAdded, setCarAdded] = useState(false);

  useEffect(() => {
    // fetches total length of cars in database

    const fetchLength = async () => {
      try {
        const res = await axios.get(ApiRoutes.API_URL_GET_CARS_LENGTH);
        setCarsLength(res.data);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetchLength();
  }, []);
  useEffect(() => {
    // fetches first 10 cars to display
    setIsLoading(true);
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          `${ApiRoutes.API_URL_GET_ALL_CARS}?page=${1}&rowsPerPage=${10}`
        );
        setIsLoading(false);
        setCars(res.data);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetchCars();
  }, [carAdded]);

  const values = {
    getCars,
    setCars,
    carAdded,
    setCarAdded,
    carsLength,
    isLoading,
    setIsLoading,
  };
  return (
    <div className="App">
      <mainContext.Provider value={values}>
        <BrowserRouter>
          <Navigation />
          {isLoading && <Loader />}
          <div className="container mt-5 p-3">
            <Routes>
              <Route path="/" element={<ListPage />}></Route>
              <Route path="/details/:id" element={<DetailsPage />}></Route>
              <Route path="/form" element={<NewRecordForm />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  );
}

export default App;
