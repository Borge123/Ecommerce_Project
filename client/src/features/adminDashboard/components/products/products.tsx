import { useLoaderData } from "react-router-dom";
import { Col } from "react-bootstrap";

import { Button } from "react-bootstrap";
import "@fontsource/anek-telugu";
import { createImageSrc } from "../../../products/helpers/createImageSrc";
import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../context/queryProvider";
import { Table, IColumnType } from "../Table/table";
export function Products() {
  //const products = useLoaderData();
  const products = queryClient.getQueryData("products");
  const navigate = useNavigate();
  //const headers = Object.keys(users[0]);
  //console.log(users);

  interface IData {
    _id: string;
    name: string;
    img_url: string;
    discount_id: string | undefined;

    //tags: string[];
  }
  // type billinginfo = {
  //   address: string;
  //   city: string;
  //   house_number: string;
  //   zip: string;
  // };

  // const Span = styled("span", {
  //   background: "#596b7e",
  //   color: "white",
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   borderRadius: 99999,
  // });

  const columns: IColumnType<IData>[] = [
    {
      key: "_id",
      title: "ID",
      width: 200,
    },
    {
      key: "name",
      title: "Name",
      width: 200,
    },
    {
      key: "img_url",
      title: "Img",
      width: 200,
      render: (_, { img_url }) => (
        <>
          <img className="img-fluid" src={createImageSrc(img_url)}></img>
        </>
      ),
    },
    {
      key: "discount_id",
      title: "Discount",
      width: 200,
    },

    {
      key: "_id",
      title: "Edit",
      width: 200,
      render: (_, { _id }) => (
        <>
          <Button
            onClick={(e) => {
              //TODO navigate to admindashboard/users/id
              console.log(_id);
              navigate(`/admindashboard/products/${_id}`);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];
  //TODO Add create new product link
  return (
    <Col>
      <h1>Products</h1>
      {/* <AdminTable headers={headers} data={users}></AdminTable> */}
      <Table data={products} columns={columns} />
    </Col>
  );
}
