import Card from "react-bootstrap/Card";

export default function Product({ product, onShow }) {
  return (
    <Card onClick={onShow}>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>{product.item.name}</Card.Title>

        <Card.Text>{product.item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
