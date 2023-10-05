import fetchProducts from "./fetchProducts";
let products = await fetchProducts();

export async function GetProduct(id) {
  const product = products.find((product) => product._id === id);
  return product ?? null;
}
