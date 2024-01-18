import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage";
import ErrorPage from "../../../pages/ErrorPage";
import { AdminLanding } from "../../../features/adminDashboard/components/adminLanding";
import { Users } from "../../../features/adminDashboard/components/users";
import { AllUsersLoader } from "./allUsersLoader";
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
      loader: AllUsersLoader,
    },
    {
      path: "products",
      element: <p>products</p>,
    },
    {
      path: "orders",
      element: <p>orders</p>,
    },
  ],
};
