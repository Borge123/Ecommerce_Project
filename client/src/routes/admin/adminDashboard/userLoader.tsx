import { GetUser } from "../../../features/adminDashboard/services/getUser";
export const userQuery = (id) => ({
  queryKey: ["users", id],

  queryFn: async () => {
    const user = await GetUser(id);
    console.log(user);

    if (!user) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { user };
  },
});

// needs access to queryClient

export const UserLoader =
  (queryClient) =>
  async ({ params }) => {
    const query = userQuery(params._id);

    // ⬇️ return data or fetch it

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
