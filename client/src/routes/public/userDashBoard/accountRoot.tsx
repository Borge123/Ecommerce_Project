import AccountPage from "../../../pages/AccountPage";
import ErrorPage from "../../../pages/ErrorPage";
import { UserInfo } from "../../../features/userDashBoard/components/userInfo";
import { AccountLanding } from "../../../features/userDashBoard/components/accountLanding";
import { UserInfoLoader } from "./userInfoLoader";
import { ChangePassword } from "../../../features/userDashBoard/components/changePassword";
export const accountRoute = {
  path: "/account",
  element: <AccountPage />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <AccountLanding />,
    },
    {
      path: "personal",
      element: <UserInfo />,
      loader: UserInfoLoader,
    },
    {
      path: "changepassword",
      element: <ChangePassword />,
    },
  ],
};
