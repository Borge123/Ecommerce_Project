import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "./Jumbotron";
export default function Main() {
  return (
    <Container>
      <Row className="justify-content-md-center vh-100">
        <Col xs={12} md={10} align="center" className="pt-4 ">
          <Jumbotron />
        </Col>
      </Row>
    </Container>
  );
}
