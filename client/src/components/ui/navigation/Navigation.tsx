import { useEffect, useState } from "react";
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
  //TODO: Try to avoid users being redirected to homepage after refreshing token
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary pb-4"
      data-bs-theme="auto"
      sticky="top"
      style={{ marginRight: "300px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
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
              <Logout click={logout} />
              <NavDropdown
                title={authState?.user.firstName}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/dashboard"
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
                <Logout click={logout} />
              </NavDropdown>
              <Nav.Link
                as={NavLink}
                to="/dashboard"
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "normal",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                {authState.user.firstName}
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
