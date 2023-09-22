import Button from "react-bootstrap/Button";
export default function Logout({ click }) {
  return (
    <>
      <Button onClick={click} variant="outline-dangerr">
        {" "}
        Logout
      </Button>
    </>
  );
}
