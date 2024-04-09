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

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const query = productsQuery();
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    // ⬇️ return data or fetch it
    const products =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    const filtered = products.filter((el) =>
      el.name.toLowerCase().includes(q.toLowerCase())
    );

    return filtered;
  };

// export async function ProductsLoader() {
//   let products = await fetchProducts();

//   return { products };
// }
