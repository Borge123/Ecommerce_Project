import HomePage from "../pages/HomePage";
import App from "../app";
import { publicRoutes } from "./public/PublicRoutes";
import { adminRoutes } from "./admin/AdminRoutes";
//import { loader } from "./public/search/searchLoader";
import ErrorPage from "../pages/ErrorPage";
import { matchSorter } from "match-sorter";
import { queryClient } from "../../../context/queryProvider";
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  console.log(q);
  return q;
  //TODO set up match sorter to get sorted results from queryClient
  //return { products, q };
}

export const root = [
  {
    path: "/",
    element: <App />,
    loader: loader,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <HomePage /> },
      ...publicRoutes,
      ...adminRoutes,
    ],
  },
];
