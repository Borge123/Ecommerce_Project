import Row from "react-bootstrap/Row";

import { useUser } from "../../authentication/context/AuthContext";
import Container from "react-bootstrap/Container";

import { Sidebar } from "./sideBar";
import { SidebarTest } from "./sideBarTest";
export default function UserDashBoard() {
  //TODO: Set up dashboard as a component that only renders other child components like account, personal info and so on
  const authState = useUser();
  return (
    <Container className="min-vh-100">
      <Row className="d-flex">
        <Sidebar />
        <SidebarTest />
      </Row>
    </Container>
  );
}
