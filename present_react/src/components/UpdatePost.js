import React, { useContext, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ApiRoutes from "../utilities/ApiRoutes";
import Inputs from "./Inputs";
import mainContext from "../context/MainContext";
import { useNavigate } from "react-router-dom";
const UpdatePost = ({ openUpdatePost, setOpenUpdatePost, id }) => {
  const { carAdded, setCarAdded, getCars, setCars } = useContext(mainContext);
  const nav = useNavigate();
  const refs = {
    carBrand: useRef(),
    carModel: useRef(),
    carDescription: useRef(),
    carImgUrl: useRef(),
    carYear: useRef(),
  };

  const updatePost = async () => {
    const objectToUpdate = {
      carId: id,
      carBrand: refs.carBrand.current.value,
      carModel: refs.carModel.current.value,
      carDescription: refs.carDescription.current.value,
      carImgUrl: refs.carImgUrl.current.value,
      carYear: Number(refs.carYear.current.value),
    };
    console.log(objectToUpdate);
    if (
      refs.carBrand.current.value.length <= 0 ||
      refs.carModel.current.value.length <= 0 ||
      refs.carDescription.current.value.length <= 0 ||
      refs.carYear.current.value.length <= 0
    ) {
      toast.error("Please fill everything!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true,
        theme: "dark",
      });
    } else {
      await axios
        .put(ApiRoutes.API_URL_UPDATE_CAR, objectToUpdate)
        .then((response) => {
          // changes state if car added for useffect in app.js
          setCarAdded(!carAdded);
          // sets new car to array of cars
          setCars([...getCars, objectToUpdate]);

          toast.success("Successfuly updated !", {
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
    <div>
      <ToastContainer />
      <Modal show={openUpdatePost}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Inputs refs={refs} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenUpdatePost(false)}>
            Close
          </Button>
          <Button variant="dark" onClick={updatePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdatePost;
