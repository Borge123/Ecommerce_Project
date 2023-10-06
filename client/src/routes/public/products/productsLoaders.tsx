import fetchProducts from "../../../features/products/services/fetchProducts";

export async function ProductsLoader() {
  let products = await fetchProducts();

  return { products };
}
