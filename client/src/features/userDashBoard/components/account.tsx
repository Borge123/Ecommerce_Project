import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";
import { useUser } from "../../authentication/context/AuthContext";
import Container from "react-bootstrap/Container";

//import { Sidebar2 } from "./sidebar2";
import { Sidebar } from "./sidebar";
export default function Account() {
  //TODO: Set up dashboard as a component that only renders other child components like account, personal info and so on
  const authState = useUser();
  return (
    <Container className="min-vh-100 mt-5">
      <Row className="d-flex h-100 ">
        <Sidebar />
        <Outlet />
      </Row>
    </Container>
  );
}
