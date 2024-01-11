import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const linkStyles = {
    borderTop: "1px solid #e9e9e9",
  };
  return (
    <Col
      xxl={4}
      className="flex-column flex-shrink-0 p-3"
      style={{ marginRight: "5em" }}
    >
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary flex-column mw-100 "
      >
        <Container className="flex-column align-items-start w-100 ">
          <Navbar.Brand as={NavLink} to="/account" className="w-100">
            Account
          </Navbar.Brand>
          <hr />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div className="w-100">
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav className="me-auto flex-column w-100">
                <Nav.Link
                  as={NavLink}
                  to="/account/personal"
                  style={linkStyles}
                >
                  Personal info
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/account/changepassword"
                  style={linkStyles}
                >
                  Change password
                </Nav.Link>

                <Nav.Link as={NavLink} to="/account/orders" style={linkStyles}>
                  Orders
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Col>
  );
}
