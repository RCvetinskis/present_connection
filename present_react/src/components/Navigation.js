import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
const Navigation = () => {
  return (
    <Navbar
      key={"sm"}
      bg="dark"
      variant="dark"
      expand={"sm"}
      className=" fixed-top"
    >
      <Container fluid>
        <Link className="navbar-brand" to="/">
          Cars List App
        </Link>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-"sm"-${"sm"}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-"sm"-${"sm"}`}
          aria-labelledby={`offcanvasNavbarLabel-"sm"-${"sm"}`}
          placement="end"
          className="bg-dark text-light"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-"sm"-${"sm"}`}>
              Movie Data App
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {" "}
              <Link className="nav-link" to="/">
                {" "}
                Home{" "}
              </Link>
              <Link className="nav-link" to="/form">
                {" "}
                New Record
              </Link>{" "}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
