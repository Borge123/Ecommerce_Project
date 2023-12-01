import ProductDetails from "../../../features/products/components/productDetails";

import { ProductLoader } from "./productLoader";
//TODO change routes to be more dynamic and make product route its own route instead of being a child route
export const product = {
  path: ":_id",
  element: <ProductDetails />,
  loader: ProductLoader,
};
