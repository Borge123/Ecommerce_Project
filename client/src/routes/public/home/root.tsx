import HomePage from "../../../pages/HomePage";
import ErrorPage from "../../../pages/ErrorPage";

export const homeRoute = {
  path: "/",
  element: <HomePage />,
  errorElement: <ErrorPage />,
};
