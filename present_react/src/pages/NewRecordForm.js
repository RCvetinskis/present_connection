import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import ApiRoutes from "../utilities/ApiRoutes";
import mainContext from "../context/MainContext";
import Inputs from "../components/Inputs";
const NewRecordForm = () => {
  const { getCars, setCars, carAdded, setCarAdded } = useContext(mainContext);

  const nav = useNavigate("/");

  const refs = {
    carBrand: useRef(),
    carModel: useRef(),
    carDescription: useRef(),
    carImgUrl: useRef(),
    carYear: useRef(),
  };
  const postCar = async () => {
    // object to post
    const newCarObj = {
      carBrand: refs.carBrand.current.value,
      carModel: refs.carModel.current.value,
      carDescription: refs.carDescription.current.value,
      carImgUrl: refs.carImgUrl.current.value,
      carYear: Number(refs.carYear.current.value),
    };
    console.log(newCarObj);
    if (
      refs.carBrand.current.value.length <= 0 ||
      refs.carModel.current.value.length <= 0 ||
      refs.carDescription.current.value.length <= 0 ||
      refs.carImgUrl.current.value.length <= 0 ||
      refs.carYear.current.value.length <= 0
    ) {
      toast.error("Please fill everything!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true,
        theme: "dark",
      });
    } else {
      // post request
      await axios
        .post(ApiRoutes.API_URL_POST_CAR, newCarObj)
        .then((response) => {
          // changes state if car added for useffect in app.js
          setCarAdded(!carAdded);
          toast.success("Successfuly Posted !", {
            position: toast.POSITION.TOP_CENTER,
            closeOnClick: true,
            theme: "dark",
          });

          const objectKeyArray = Object.keys(refs);
          objectKeyArray.forEach((key) => {
            // cleras refs after click
            refs[key].current.value = "";
          });
          // navigates to main page after 3 seconds
          setTimeout(() => {
            nav("/");
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Connection failure with server", {
            position: toast.POSITION.TOP_CENTER,
            closeOnClick: true,
            theme: "dark",
          });
        });
    }
  };

  return (
    <div className="mt-3">
      <Helmet>
        <title>Add Car</title>
      </Helmet>
      <h1 className="text-center mb-3">Add Car</h1>
      <ToastContainer />
      {/* inputs */}
      <Inputs refs={refs} />
      {/* custom button */}
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={postCar}
          className="submit-btn"
          data-car="Car"
          data-post="Post"
        ></button>
      </div>
    </div>
  );
};

export default NewRecordForm;
