import HomePage from "../pages/HomePage";
import App from "../app";
import { publicRoutes } from "./public/PublicRoutes";
import { adminRoutes } from "./admin/AdminRoutes";
import ErrorPage from "../pages/ErrorPage";
export const root = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <HomePage /> },
      ...publicRoutes,
      ...adminRoutes,
    ],
  },
];
