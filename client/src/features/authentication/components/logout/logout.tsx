import Button from "react-bootstrap/Button";
import { useUserDispatch } from "../../context/AuthContext";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
export default function Logout({ click }) {
  const dispatch = useUserDispatch();
  const { removeItem } = useLocalStorage();
  return (
    <>
      <Button
        onClick={() => {
          click();
          dispatch({
            type: "logout",
          });
          removeItem("user");
        }}
        variant="outline-dangerr"
      >
        {" "}
        Logout
      </Button>
    </>
  );
}
