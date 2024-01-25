import { useLoaderData } from "react-router-dom";
import { Col } from "react-bootstrap";

import { Button } from "react-bootstrap";
import "@fontsource/anek-telugu";
import { styled } from "@stitches/react";
import { useNavigate } from "react-router-dom";

import { Table, IColumnType } from "../Table/table";
export function Orders() {
  const orders = useLoaderData();
  const navigate = useNavigate();
  //const headers = Object.keys(users[0]);
  //console.log(users);

  interface IData {
    _id: string;
    user_id: string;
    status: string;
    discount_id: string | undefined;
    total: number;
    createdAt: string;

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
      key: "user_id",
      title: "User id",
      width: 200,
    },
    {
      key: "status",
      title: "Order status",
      width: 200,
    },
    {
      key: "discount_id",
      title: "Discount",
      width: 200,
    },
    {
      key: "total",
      title: "Total",
      width: 200,
    },
    {
      key: "createdAt",
      title: "Created",
      width: 200,
    },
    {
      key: "_id",
      title: "Edit",
      width: 200,
      render: (_, { _id }) => (
        <>
          <Button
            onClick={() => {
              console.log(_id);
              navigate(`/admindashboard/orders/${_id}`);
            }}
          >
            Edit
          </Button>
        </>
      ),
    },

    // {
    //   key: "billinginfo",
    //   title: "Billinginfo",
    //   width: 200,
    //   render: (_, { billinginfo }) => (
    //     <>
    //       {}
    //       {Object.keys(billinginfo).map((info, infoIndex) => (
    //         <Span
    //           key={`info-${infoIndex}`}
    //           style={{ marginLeft: infoIndex * 4 }}
    //         >
    //           {info + ": " + info[infoIndex]}
    //         </Span>
    //       ))}
    //     </>
    //   ),
    // },
    //   {
    //     key: "tags",
    //     title: "Tags",
    //     width: 200,
    //     render: (_, { tags }) => (
    //       <>
    //         {tags.map((tag, tagIndex) => (
    //           <Span key={`tag-${tagIndex}`} style={{ marginLeft: tagIndex * 4 }}>
    //             {tag}
    //           </Span>
    //         ))}
    //       </>
    //     ),
    //   },
  ];

  return (
    <Col>
      <h1>Orders</h1>
      {/* <AdminTable headers={headers} data={users}></AdminTable> */}
      <Table data={orders} columns={columns} />
    </Col>
  );
}
