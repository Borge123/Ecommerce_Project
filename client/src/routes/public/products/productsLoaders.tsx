import fetchProducts from "../../../features/products/services/fetchProducts";

export async function ProductsLoader() {
  const products = await fetchProducts();

  return { products };
}
