import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import Container from "react-bootstrap/Container";

export default function AdminDashboard() {
  //TODO: Set up dashboard as a component that only renders other child components like account, personal info and so on

  return (
    <Container className=" mt-5 mw-100">
      <Row className="d-flex w-100  ">
        <Sidebar />
        <Outlet />
      </Row>
    </Container>
  );
}
