import { useLoaderData } from "react-router-dom";
import { Col } from "react-bootstrap";
import { AdminTable } from "./table";
export function Users() {
  const { users } = useLoaderData();

  return (
    <Col>
      <h1>Users</h1>
      <AdminTable headers={{ testkey: "test" }} data={users}></AdminTable>
    </Col>
  );
}
