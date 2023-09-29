import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/context/AuthContext";
export default function ProtectedLayout({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
