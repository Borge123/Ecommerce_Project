import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Col } from "react-bootstrap";

export function SidebarTest() {
  return (
    <Col xxl={4} className="flex-column flex-shrink-0 p-3 bg-light  m-5">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary flex-column mw-100"
      >
        <Container className="flex-column align-items-start w-100 ">
          <Navbar.Brand className="w-100" href="#home">
            React-Bootstrap
          </Navbar.Brand>
          <hr />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div className="w-100">
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav className="me-auto flex-column w-100">
                <Nav.Link
                  style={{ borderTop: "1px solid #e9e9e9" }}
                  href="#features"
                >
                  Features
                </Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Col>
  );
}
