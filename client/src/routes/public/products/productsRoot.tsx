import ProductsPage from "../../../pages/ProductsPage";
import ErrorPage from "../../../pages//ErrorPage";
import fetchProducts from "../../../features/products/services/fetchProducts";
// create loader and export it
export async function productLoader() {
  const products = await fetchProducts();
  return { products };
}
export const productsRoute = {
  path: "/products",
  element: <ProductsPage />,
  errorElement: <ErrorPage />,
  loader: productLoader,
};
