import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
export default function Product({ product }) {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{product.item.name}</Card.Title>

          <Card.Text>{product.item.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
