import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUser } from "../../authentication/context/AuthContext";
import Container from "react-bootstrap/Container";
import { logout } from "../../authentication/services/logoutServices";
import Logout from "../../authentication/components/logout/logout";
export default function UserDashBoard() {
  const authState = useUser();
  return (
    <Container>
      <Row
        xs={1}
        md={2}
        l={4}
        xxl={4}
        className=" vh-100 g-4 justify-content-md-center m-auto"
      >
        <Col>
          <h1>Dashboard for {authState.user?.firstName}</h1>
          <Logout click={logout} />
        </Col>
      </Row>
    </Container>
  );
}
