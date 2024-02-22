import { GetOrder } from "../../../../features/adminDashboard/services/orders/getOrder";
export const orderQuery = (id) => ({
  queryKey: ["order", id],

  queryFn: async () => {
    const order = await GetOrder(id);
    console.log(order);

    if (!order) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { order };
  },
});

// needs access to queryClient

export const OrderLoader =
  (queryClient) =>
  async ({ params }) => {
    const query = orderQuery(params._id);

    // ⬇️ return data or fetch it

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
