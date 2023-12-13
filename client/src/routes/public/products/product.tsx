import ProductDetailsPage from "../../../pages/ProductDetailsPage";

import { ProductLoader } from "./productLoader";
import { queryClient } from "../../../features/products/context/productsProvider";
//TODO change routes to be more dynamic and make product route its own route instead of being a child route

export const product = {
  path: "/products/:_id",
  element: <ProductDetailsPage />,
  loader: ProductLoader(queryClient),
};
