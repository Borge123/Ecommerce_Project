import fetchProducts from "./fetchProducts";
import { queryClient } from "../../../context/queryProvider";

//(await queryClient.getQueryData(["products"])) ?? (await fetchProducts());
//await fetchProducts();
//console.log(queryClient.getQueryCache());
//console.log(products);

export async function GetProduct(id) {
  const products =
    (await queryClient.getQueryData(["products"])) ?? (await fetchProducts());
  //console.log(products);
  //const products = await queryClient.getQueryData(["products"]);
  if (products) {
    const product = products.find((product) => product._id === id);
    //console.log(product);

    return product ?? null;
  }
  return;
}
