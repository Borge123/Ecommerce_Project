import ProductDetailsPage from "../../../pages/ProductDetailsPage";

import { ProductLoader } from "./productLoader";
//TODO change routes to be more dynamic and make product route its own route instead of being a child route
export const producttest = {
  path: "/products/:_id",
  element: <p>Hello.....</p>,
  //loader: ProductLoader,
};
