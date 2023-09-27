import Button from "react-bootstrap/Button";
import { useUserDispatch } from "../../context/AuthContext";
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
        }}
        variant="outline-dangerr"
      >
        {" "}
        Logout
      </Button>
    </>
  );
}
