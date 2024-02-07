import { redirect } from "react-router-dom";
import { UpdateItem } from "../../../features/adminDashboard/services/products/updateItem";
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    updates._id = params._id;
    console.log(updates);

    await UpdateItem(updates);
    //await queryClient.invalidateQueries({ queryKey: ["product", params._id] });
    await queryClient.refetchQueries({ queryKey: ["products"] });
    console.log(await queryClient.getQueryData(["products"]));

    return redirect(`/admindashboard/products`);
    //TODO figure out how to trigger action
  };
