import UserDashBoardPage from "../../../pages/UserDashBoardPage";
import ErrorPage from "../../../pages//ErrorPage";

export const dashBoardRoute = {
  path: "/dashboard",
  element: <UserDashBoardPage />,
  errorElement: <ErrorPage />,
  children: [{}],
};
