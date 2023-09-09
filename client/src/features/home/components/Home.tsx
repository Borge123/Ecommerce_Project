import "../assets/home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "./Jumbotron";
export default function Main() {
  return (
    <Container className="mw-100 homeContainer ">
      <Row className="justify-content-md-center vh-100">
        <Col
          xs={12}
          md={10}
          lg={10}
          xl={6}
          align="center"
          className="m-auto border border-dark  rounded-top"
        >
          <Jumbotron text="Welcome to my web shop" delay={100} />
        </Col>
      </Row>
    </Container>
  );
}
