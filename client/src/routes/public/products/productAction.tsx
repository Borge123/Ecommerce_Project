import { redirect } from "react-router-dom";
import { UpdateItem } from "../../../features/adminDashboard/services/products/updateItem";
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    updates._id = params._id;

    await UpdateItem(updates);
    //await queryClient.invalidateQueries({ queryKey: ["product", params._id] });
    await queryClient.refetchQueries({ queryKey: ["products"] });
    await queryClient.invalidateQueries({ queryKey: ["product"] });
    // await queryClient.invalidateQueries({
    //   queryKey: ["product"],
    // });

    return redirect(`/admindashboard/products`);
    //TODO figure out how to trigger action
  };
