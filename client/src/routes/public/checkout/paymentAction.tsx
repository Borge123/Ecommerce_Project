import { redirect } from "react-router-dom";
import { createOrder } from "../../../features/checkout/services/createOrder";
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();

    const parsedCart = JSON.parse(localStorage.getItem("cart"));
    console.log(parsedCart);
    localStorage.setItem("cart", JSON.stringify([]));
    await createOrder(parsedCart);

    await queryClient.refetchQueries({ queryKey: ["orders"] });
    await queryClient.invalidateQueries({ queryKey: ["order"] });
    console.log(await queryClient.getQueriesData(["order"]));

    return redirect(`/admindashboard/orders`);
    //TODO figure out how to trigger action
  };
