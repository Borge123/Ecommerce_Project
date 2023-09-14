import fetchProducts from "./fetchProducts";
export async function getProduct(id) {
  const products = await fetchProducts();
  const product = products.find((product) => product._id === id);
  return product ?? null;
}
