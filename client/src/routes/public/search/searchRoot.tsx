import ErrorPage from "../../../pages//ErrorPage";
import ProductsPage from "../../../pages/ProductsPage";
import { loader } from "./searchLoader";
export const searchRoute = {
  path: "/search/products",
  //element: <ProductsPage />,
  element: <h1>Search Route</h1>,
  //loader: loader,
};
