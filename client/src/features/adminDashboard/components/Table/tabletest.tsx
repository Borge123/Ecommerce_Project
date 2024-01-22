import "@fontsource/anek-telugu";
import { styled } from "@stitches/react";

import { Table, IColumnType } from "./table";

interface IData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  billinginfo: billinginfo;
  //tags: string[];
}
type billinginfo = {
  address: string;
  city: string;
  house_number: string;
  zip: string;
};

const Span = styled("span", {
  background: "#596b7e",
  color: "white",
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 99999,
});

const columns: IColumnType<IData>[] = [
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
    key: "billinginfo",
    title: "Billinginfo",
    width: 200,
    render: (_, { billinginfo }) => (
      <>
        {Object.keys(billinginfo).map((info, infoIndex) => (
          <Span key={`info-${infoIndex}`} style={{ marginLeft: infoIndex * 4 }}>
            {info + ": " + info[infoIndex]}
          </Span>
        ))}
      </>
    ),
  },
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

export function TableTest() {
  return <Table data={data} columns={columns} />;
}
