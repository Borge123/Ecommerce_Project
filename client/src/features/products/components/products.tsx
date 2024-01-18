import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Product from "./product";
import { Outlet } from "react-router-dom";
import { useModalDispatch } from "../context/productModalContext";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "react-query";
import { productsQuery } from "../../../routes/public/products/productsLoaders";
import { UseGetFetchQuery } from "../hooks/useGetFetchQuery";
export default function Products() {
  //const { products } = useLoaderData();
  //const { data: products } = useQuery(productsQuery());
  const products = UseGetFetchQuery("products");
  const dispatch = useModalDispatch();
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
              <Product
                product={product}
                onShow={() =>
                  dispatch({
                    type: "open",
                    product: product,
                  })
                }
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
