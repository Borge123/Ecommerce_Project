import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage";
import ErrorPage from "../../../pages/ErrorPage";
import { AdminLanding } from "../../../features/adminDashboard/components/adminLanding";
import { Users } from "../../../features/adminDashboard/components/users/users";
import { AllUsersLoader } from "./allUsersLoader";
import { queryClient } from "../../../context/queryProvider";
import { UserLoader } from "./userLoader";
import { User } from "../../../features/adminDashboard/components/users/user";
export const adminDashboardRoute = {
  path: "/admindashboard",
  element: <AdminDashboardPage />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <AdminLanding />,
    },
    {
      path: "users",
      element: <Users />,
      loader: AllUsersLoader(queryClient),
    },
    {
      path: "products",
      element: <p>products</p>,
    },
    {
      path: "orders",
      element: <p>orders</p>,
    },
    {
      path: "/admindashboard/users/:_id",
      element: <User />,
      loader: UserLoader(queryClient),
    },
  ],
};
