import ProductsPage from "../../../pages/ProductsPage";
import ErrorPage from "../../../pages//ErrorPage";

import { product } from "./product";
import { ProductsLoader } from "./productsLoaders";
// create loader and export it
import { queryClient } from "../../../features/products/context/productsProvider";
export const productsRoute = {
  path: "/products",
  element: <ProductsPage />,
  errorElement: <ErrorPage />,
  loader: ProductsLoader(queryClient),
  //children: [product],
};
