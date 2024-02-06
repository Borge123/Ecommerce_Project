export const action =
  (queryClient) =>
  async ({ request, params }) => {
    queryClient.invalidateQueries({ queryKey: ["product", params._id] });
    //TODO figure out how to trigger action
    console.log(request);
  };
