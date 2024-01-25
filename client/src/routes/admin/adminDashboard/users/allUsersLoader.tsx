import { GetAllUsers } from "../../../../features/adminDashboard/services/users/getAllUsers";
// export async function AllUsersLoader() {
//   const users = await GetAllUsers();

//   return { users };
// }

export const usersQuery = () => ({
  queryKey: ["users"],

  queryFn: async () => {
    const users = await GetAllUsers();
    console.log(users);

    if (!users) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return users;
  },
});

// ⬇️ needs access to queryClient

export const AllUsersLoader = (queryClient) => async () => {
  const query = usersQuery();

  // ⬇️ return data or fetch it

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
