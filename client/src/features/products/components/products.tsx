import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Product from "./product";
export default function Products() {
  return (
    <Container>
      <Row xs={1} md={2} l={4} xxl={4} className="g-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Col key={idx}>
            <Product />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
