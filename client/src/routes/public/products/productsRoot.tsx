import ProductsPage from "../../../pages/ProductsPage";
import ErrorPage from "../../../pages//ErrorPage";
import fetchProducts from "../../../features/products/services/fetchProducts";
import { product } from "./product";
// create loader and export it
export async function productsLoader() {
  const products = await fetchProducts();
  return { products };
}
export const productsRoute = {
  path: "/products",
  element: <ProductsPage />,
  errorElement: <ErrorPage />,
  loader: productsLoader,
  children: [product],
};
