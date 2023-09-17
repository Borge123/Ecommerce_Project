import { getProduct } from "../../../features/products/services/getProduct";
import ProductDetails from "../../../features/products/components/productDetails";

export async function productLoader({ params }) {
  const product = await getProduct(params.productId);
  return { product };
}

export const product = {
  path: "/products/:productId",
  element: <ProductDetails />,
  loader: productLoader,
};
