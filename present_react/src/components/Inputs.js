import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
const Inputs = ({ refs }) => {
  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-3">
        <FloatingLabel label="Car carBrand" className=" w-100">
          <Form.Control
            ref={refs.carBrand}
            type="text"
            placeholder="Car Brand"
          />
        </FloatingLabel>
        <FloatingLabel label="Car Model" className="w-100">
          <Form.Control
            ref={refs.carModel}
            type="text"
            placeholder="Car Model"
          />
        </FloatingLabel>
      </div>
      <FloatingLabel label="Car Description">
        <Form.Control
          ref={refs.carDescription}
          as="textarea"
          type="text"
          placeholder="Car Description"
          style={{ height: "100px" }}
        />
      </FloatingLabel>

      <div className="d-flex align-items-center gap-3 mt-3">
        <FloatingLabel label="Car Image URL not required" className=" w-100">
          <Form.Control
            ref={refs.carImgUrl}
            type="text"
            placeholder="Car Image URL"
          />
        </FloatingLabel>
        <FloatingLabel label="Car Year" className="w-auto">
          <Form.Control
            ref={refs.carYear}
            type="number"
            placeholder="Car Year"
          />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default Inputs;
