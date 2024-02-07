import fetchProducts from "./fetchProducts";
import { queryClient } from "../../../context/queryProvider";

//const products = await fetchProducts();
const products =
  (await queryClient.getQueryData(["products"])) ?? (await fetchProducts());
//console.log(queryClient.getQueryCache());

export async function GetProduct(id) {
  const product = products.find((product) => product._id === id);
  console.log(product);

  return product ?? null;
}
