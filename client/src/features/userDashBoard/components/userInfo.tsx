import { Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import UserInfoForm from "./userInfoForm";
export function UserInfo() {
  const { user } = useLoaderData();
  return (
    <Col>
      <UserInfoForm userInfo={user} />
    </Col>
  );
}
