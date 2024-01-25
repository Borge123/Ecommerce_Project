import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage";
import ErrorPage from "../../../pages/ErrorPage";
import { AdminLanding } from "../../../features/adminDashboard/components/adminLanding";
import { Users } from "../../../features/adminDashboard/components/users/users";
import { AllUsersLoader } from "./users/allUsersLoader";
import { queryClient } from "../../../context/queryProvider";
import { UserLoader } from "./users/userLoader";
import { User } from "../../../features/adminDashboard/components/users/user";
import { Orders } from "../../../features/adminDashboard/components/orders/orders";
import { AllOrdersLoader } from "./orders/allOrdersLoader";
import { OrderLoader } from "./orders/orderLoader";
import { Order } from "../../../features/adminDashboard/components/orders/order";
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
      path: "/admindashboard/users/:_id",
      element: <User />,
      loader: UserLoader(queryClient),
    },
    {
      path: "products",
      element: <p>products</p>,
    },
    {
      path: "orders",
      element: <Orders />,
      loader: AllOrdersLoader(queryClient),
    },
    {
      path: "/admindashboard/orders/:_id",
      element: <Order />,
      loader: OrderLoader(queryClient),
    },
  ],
};
