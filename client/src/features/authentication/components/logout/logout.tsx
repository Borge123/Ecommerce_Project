import Button from "react-bootstrap/Button";
import { useUserDispatch } from "../../context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate } from "react-router-dom";
export default function Logout({ click }) {
  const dispatch = useUserDispatch();

  return (
    <>
      <NavDropdown.Item
        onClick={() => {
          dispatch({
            type: "logout",
          });
          sessionStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          localStorage.removeItem("jwtExpire");
          click();
        }}
      >
        Logout
      </NavDropdown.Item>
    </>
  );
}
