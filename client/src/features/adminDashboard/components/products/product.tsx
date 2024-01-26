import { useLoaderData } from "react-router-dom";
import { Col } from "react-bootstrap";
export function Product() {
  const { product } = useLoaderData();

  return (
    <>
      <Col>
        <p>{product.name}</p>
      </Col>
    </>
  );
}
