import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Product from "./product";
import { useLoaderData } from "react-router-dom";
export default function Products() {
  const { products } = useLoaderData();

  return (
    <Container className="">
      <Row
        xs={1}
        md={2}
        l={4}
        xxl={4}
        className=" vh-100 g-4 justify-content-md-center m-auto"
      >
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </Row>
    </Container>
  );
}
