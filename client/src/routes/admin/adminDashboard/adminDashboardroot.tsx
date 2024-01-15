import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage";
import ErrorPage from "../../../pages/ErrorPage";
export const adminDashboardRoute = {
  path: "/admin/dasboard",
  element: <AdminDashboardPage />,
  errorElement: <ErrorPage />,
  children: [],
};
