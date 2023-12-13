import { GetProduct } from "../../../features/products/services/getProduct";
// export async function ProductLoader({ params }) {
//   const product = await GetProduct(params._id);

//   console.log(product);

//   return { product };
// }

export const productQuery = (id) => ({
  queryKey: ["products", id],

  queryFn: async () => {
    const product = await GetProduct(id);
    if (!product) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { product };
  },
});

// ⬇️ needs access to queryClient

export const ProductLoader =
  (queryClient) =>
  async ({ params }) => {
    const query = productQuery(params._id);

    // ⬇️ return data or fetch it

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
