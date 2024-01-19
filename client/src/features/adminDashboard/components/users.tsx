import { useLoaderData } from "react-router-dom";
import { Col } from "react-bootstrap";
import { AdminTable } from "./table";
export function Users() {
  const { users } = useLoaderData();
  const headers = Object.keys(users[0]);
  //console.log(users);

  return (
    <Col>
      <h1>Users</h1>
      <AdminTable headers={headers} data={users}></AdminTable>
    </Col>
  );
}
