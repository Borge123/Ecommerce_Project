import { GetProduct } from "../../../features/products/services/getProduct";
export async function ProductLoader({ params }) {
  const product = await GetProduct(params.productId);
  return { product };
}
