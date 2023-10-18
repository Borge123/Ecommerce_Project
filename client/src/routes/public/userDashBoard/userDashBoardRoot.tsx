import UserDashBoardPage from "../../../pages/UserDashBoardPage";
import ErrorPage from "../../../pages//ErrorPage";
import { UserInfo } from "../../../features/userDashBoard/components/userInfo";
import { AccountLanding } from "../../../features/userDashBoard/components/accountLanding";
export const dashBoardRoute = {
  path: "/dashboard",
  element: <UserDashBoardPage />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <AccountLanding />,
    },
    {
      path: "account/personal",
      element: <UserInfo />,
    },
  ],
};
