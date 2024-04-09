import ErrorPage from "../../../pages//ErrorPage";
import ProductsPage from "../../../pages/ProductsPage";
import { queryClient } from "../../../context/queryProvider";
import { loader } from "./searchLoader";
export const searchRoute = {
  path: "/search/products",
  element: <ProductsPage />,

  loader: loader(queryClient),
};
