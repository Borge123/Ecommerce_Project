import fetchProducts from "./fetchProducts";
import { queryClient } from "../../../context/queryProvider";

const products = await fetchProducts();
//const products = await queryClient.getQueryData(["products"]);
console.log(queryClient.getQueryCache());

export async function GetProduct(id) {
  //only call once on first render

  const product = products.find((product) => product._id === id);
  return product ?? null;
}
