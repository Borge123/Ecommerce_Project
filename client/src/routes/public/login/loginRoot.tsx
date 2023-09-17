import LoginPage from "../../../pages/LoginPage";
import ErrorPage from "../../../pages/ErrorPage";
export const loginRoute = {
  path: "/login",
  element: <LoginPage />,
  errorElement: <ErrorPage />,
};
