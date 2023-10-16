import Row from "react-bootstrap/Row";

import { useUser } from "../../authentication/context/AuthContext";
import Container from "react-bootstrap/Container";

import { Sidebar } from "./sideBar";
export default function UserDashBoard() {
  //TODO: Set up dashboard as a component that only renders other child components like account, personal info and so on
  const authState = useUser();
  return (
    <Container fluid="md">
      <Row xs={1} md={2} l={4} xxl={4} className=" g-4 m-auto  ">
        <Sidebar />
        <Sidebar />
        <Sidebar />
      </Row>
    </Container>
  );
}
