import Button from "react-bootstrap/Button";
import { useUserDispatch } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function Logout({ click }) {
  const dispatch = useUserDispatch();

  return (
    <>
      <Button
        onClick={() => {
          click();
          dispatch({
            type: "logout",
          });
          <Navigate to="/" />;
        }}
        variant="outline-dangerr"
      >
        {" "}
        Logout
      </Button>
    </>
  );
}
