import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Cart } from "../../../features/cart/components/cart";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink, Link } from "react-router-dom";
import { logout } from "../../../features/authentication/services/logoutServices";
import Logout from "../../../features/authentication/components/logout/logout";
import { useUser } from "../../../features/authentication/context/AuthContext";
export default function Navigation() {
  const authState = useUser();

  return (
    <header style={{ height: "88px" }}>
      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="">
          <Nav className="">
            <Navbar.Brand as={Link} to="/">
              E-Commerce
            </Navbar.Brand>
          </Nav>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" style={{ flex: "0 1 900px" }}>
            <Nav style={{ flex: "1 1 100%" }}>
              <Form className="d-flex w-100">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 w-100"
                  aria-label="Search"
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary pb-4"
        data-bs-theme="auto"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <Navbar.Brand as={Link} to="/">
                E-Commerce
              </Navbar.Brand>
            </Nav>
            <Nav style={{ flex: "1 1 50%" }}>
              <Form className="d-flex w-50">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 w-100"
                  aria-label="Search"
                />
              </Form>
            </Nav>

            <Nav className="">
              <Nav.Link
                as={NavLink}
                to="/"
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/products"
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Products
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/signup"
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Signup
              </Nav.Link>
            </Nav>
            {!authState.user ? (
              <Nav>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "normal",
                      color: isPending ? "red" : "black",
                    };
                  }}
                >
                  Login
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <NavDropdown
                  title={authState?.user.firstName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/account"
                    style={({ isActive, isPending }) => {
                      return {
                        fontWeight: isActive ? "bold" : "normal",
                        color: isPending ? "red" : "black",
                        backgroundColor: isActive ? "inherit" : "inherit",
                      };
                    }}
                  >
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/"
                    style={({ isActive, isPending }) => {
                      return {
                        fontWeight: isActive ? "bold" : "normal",
                        color: isPending ? "red" : "black",
                        backgroundColor: isActive ? "inherit" : "inherit",
                      };
                    }}
                  >
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item href="">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <Logout click={logout} />{" "}
                </NavDropdown>
                <Navbar.Text>
                  Signed in as: {authState.user.firstName}
                </Navbar.Text>
              </Nav>
            )}
          </Navbar.Collapse>
          <Cart />
        </Container>
      </Navbar>
    </header>
  );
}
