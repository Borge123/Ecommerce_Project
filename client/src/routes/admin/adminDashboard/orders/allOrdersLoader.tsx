import { GetAllOrders } from "../../../../features/adminDashboard/services/orders/getAllOrders";
// export async function AllUsersLoader() {
//   const users = await GetAllUsers();

//   return { users };
// }

export const ordersQuery = () => ({
  queryKey: ["orders"],

  queryFn: async () => {
    const orders = await GetAllOrders();

    if (!orders) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return orders;
  },
});

// ⬇️ needs access to queryClient

export const AllOrdersLoader = (queryClient) => async () => {
  const query = ordersQuery();

  // ⬇️ return data or fetch it

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
