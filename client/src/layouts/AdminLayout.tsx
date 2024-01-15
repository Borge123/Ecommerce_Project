import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/context/AuthContext";
export default function AdminLayout({ children }) {
  //const { user } = useUser();
  //Context seems to be to slow to to update state so getting data straight from localstorage seems to be the only solution atm
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user);
    if (
      Object.keys(parsedUser).length === 0 &&
      parsedUser.constructor === Object
    ) {
      throw new Error("Localstorage user object empty");
    }
    if (parsedUser.role != "admin") {
      throw new Error("Unathorized");
    }
    return children;
  }
  return <Navigate to="/" />;
}
