import { Link } from "react-router-dom";
export function OrderCreated() {
  return (
    <>
      <div className=" py-5 text-center">
        <h1>Order created</h1>

        <Link to={"/"}>
          <p>Home</p>
        </Link>
      </div>
    </>
  );
}
