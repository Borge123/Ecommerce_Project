import { GetProduct } from "../../../../features/products/services/getProduct";

export const skuQuery = (id, sku) => ({
  queryKey: ["productSku", id, sku],

  queryFn: async () => {
    const product = await GetProduct(id);

    if (!product) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    const currSku = product.skus.find((e) => e.sku === sku);
    console.log(currSku);

    if (!currSku) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { currSku };
  },
});

// needs access to queryClient

export const SkuLoader =
  (queryClient) =>
  async ({ params }) => {
    const query = skuQuery(params._id, params.sku);

    // ⬇️ return data or fetch it

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
