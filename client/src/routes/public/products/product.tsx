import ProductDetails from "../../../features/products/components/productDetails";
import { ProductLoader } from "./productLoader";

export const product = {
  path: "/products/:productId",
  element: <ProductDetails />,
  loader: ProductLoader,
};
