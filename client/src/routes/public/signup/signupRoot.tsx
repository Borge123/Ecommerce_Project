import ErrorPage from "../../../pages/ErrorPage";
import SignupPage from "../../../pages/SignupPage";
export const signupRoute = {
  path: "/signup",
  element: <SignupPage />,
  errorElement: <ErrorPage />,
};
