import UserDashBoardPage from "../../../pages/AccountPage";
import ErrorPage from "../../../pages/ErrorPage";
import { UserInfo } from "../../../features/userDashBoard/components/userInfo";
import { AccountLanding } from "../../../features/userDashBoard/components/accountLanding";
export const dashBoardRoute = {
  path: "/account",
  element: <UserDashBoardPage />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <AccountLanding />,
    },
    {
      path: "personal",
      element: <UserInfo />,
    },
  ],
};
