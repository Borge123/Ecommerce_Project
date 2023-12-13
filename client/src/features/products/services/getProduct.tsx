import fetchProducts from "./fetchProducts";

const products = await fetchProducts();

export async function GetProduct(id) {
  //only call once on first render

  const product = products.find((product) => product._id === id);
  return product ?? null;
}
