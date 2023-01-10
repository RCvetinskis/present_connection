import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ApiRoutes from "../utilities/ApiRoutes";
import UpdatePost from "../components/UpdatePost";
import mainContext from "../context/MainContext";

const DetailsPage = () => {
  const [car, setCar] = useState(null);
  const [openUpdatePost, setOpenUpdatePost] = useState(false);
  const { carAdded, setCarAdded } = useContext(mainContext);
  const { id } = useParams();
  const nav = useNavigate();
  const imgRegex = /(https?:\/\/.*\.(?:png|jpg))/i;

  useEffect(() => {
    //fetches car by id
    const fetchCar = async () => {
      try {
        const res = await axios.get(ApiRoutes.API_URL_GET_CAR_BY_ID + `/${id}`);
        // sets car from db
        setCar(res.data);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetchCar();
  }, []);

  const deletePost = async () => {
    await axios
      .delete(ApiRoutes.API_URL_DELETE_CAR_BY_ID + `/${id}`)
      .then((response) => {
        toast.success(response.data, {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true,
          theme: "dark",
        });

        // changes state if car added for useffect in app.js
        setCarAdded(!carAdded);

        setTimeout(() => {
          nav("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Connection failure with server", {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: true,
          theme: "dark",
        });
      });
  };
  return (
    <div>
      {car && (
        <div className="car-card">
          <Helmet>
            <title>{car.carBrand}</title>
          </Helmet>
          <ToastContainer />
          <h1>Car Details</h1>
          <Card bg="dark" text="light">
            {car.carImgUrl.match(imgRegex) ? (
              <Card.Img src={car.carImgUrl} alt="Card image" />
            ) : (
              <p className="text-danger text-center">Image not found</p>
            )}

            <Card.Header className="text-capitalize">
              {car.carBrand}
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-capitalize">
                {" "}
                {car.CarModel}{" "}
              </Card.Title>
              <Card.Text className="text-white-50">
                {car.carDescription}
              </Card.Text>
              <Card.Text className="text-white">{car.carYear}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
      <div className="d-flex  justify-content-around mt-5">
        <button
          className="btn btn-dark"
          onClick={() => setOpenUpdatePost(true)}
        >
          Update Post
        </button>
        <button className="btn btn-dark" onClick={() => deletePost()}>
          Delete Post
        </button>
      </div>

      {/* update post modal */}
      {openUpdatePost && (
        <UpdatePost
          openUpdatePost={openUpdatePost}
          setOpenUpdatePost={setOpenUpdatePost}
          id={id}
        />
      )}
    </div>
  );
};

export default DetailsPage;
