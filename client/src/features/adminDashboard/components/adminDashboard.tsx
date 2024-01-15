import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";

export default function AdminDashboard() {
  //TODO: Set up dashboard as a component that only renders other child components like account, personal info and so on

  return (
    <Container className=" mt-5">
      <Row className="d-flex  ">
        <p>Vertical row goes here</p>
        <Outlet />
      </Row>
    </Container>
  );
}
