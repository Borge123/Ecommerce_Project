import fetchProducts from "../../../features/products/services/fetchProducts";

export const productsQuery = () => ({
  queryKey: ["products"],

  queryFn: async () => {
    const products = await fetchProducts();
    if (!products) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return products;
  },
});

// ⬇️ needs access to queryClient

export const ProductsLoader = (queryClient) => async () => {
  const query = productsQuery();

  // ⬇️ return data or fetch it

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

// export async function ProductsLoader() {
//   let products = await fetchProducts();

//   return { products };
// }
