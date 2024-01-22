import { useLoaderData } from "react-router-dom";
import { Col } from "react-bootstrap";
import { AdminTable } from "./table";
import { Button } from "react-bootstrap";
import "@fontsource/anek-telugu";
import { styled } from "@stitches/react";

import { Table, IColumnType } from "./Table/table";
export function Users() {
  const { users } = useLoaderData();
  //const headers = Object.keys(users[0]);
  //console.log(users);

  interface IData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;

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
      key: "firstName",
      title: "First Name",
      width: 200,
    },
    {
      key: "lastName",
      title: "Last Name",
      width: 200,
    },
    {
      key: "email",
      title: "Email",
      width: 200,
    },
    {
      key: "role",
      title: "Role",
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

  // const data: IData[] = [
  //   {
  //     fullName: "Francisco Mendes",
  //     role: "Full Stack",
  //     tags: ["dev", "blogger"],
  //   },
  //   {
  //     fullName: "Ricardo Malva",
  //     role: "Social Media Manager",
  //     tags: ["designer", "photographer"],
  //   },
  // ];

  return (
    <Col>
      <h1>Users</h1>
      {/* <AdminTable headers={headers} data={users}></AdminTable> */}
      <Table data={users} columns={columns} />
    </Col>
  );
}
