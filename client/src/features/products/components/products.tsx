import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Product from "./product";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
export default function Products() {
  const { products } = useLoaderData();
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <h1 align="center">Products</h1>
      <Row
        xs={1}
        md={2}
        l={4}
        xxl={4}
        className=" vh-100 g-4 justify-content-md-center m-auto"
      >
        {products.map((product) => {
          return (
            <Col key={product._id}>
              <Link to={`/products/${product._id}`}>
                <Product product={product} onShow={() => setModalShow(true)} />
              </Link>

              {/* <ProductModal show={modalShow} onHide={() => setModalShow(false)} />  */}
            </Col>
          );
        })}
        <Outlet context={[modalShow, setModalShow]} />
      </Row>
    </Container>
  );
}
