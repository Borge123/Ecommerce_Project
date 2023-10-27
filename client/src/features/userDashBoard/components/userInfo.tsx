import { Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
export function UserInfo() {
  const { user } = useLoaderData();
  return (
    <Col>
      <h1>{user.firstName + " " + user.lastName}</h1>
      <p>{user.email}</p>
    </Col>
  );
}
