import { redirect } from "react-router-dom";
import { UpdateSku } from "../../../features/adminDashboard/services/products/updateSku"; } 
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    updates._id = params._id;
    updates.sku = params.sku;
    console.log(updates);

    await UpdateSku(updates);
    //await queryClient.invalidateQueries({ queryKey: ["product", params._id] });
    await queryClient.refetchQueries({ queryKey: ["products"] });
    
    // await queryClient.invalidateQueries({
    //   queryKey: ["product"],
    // });
    console.log(await queryClient.getQueriesData(["product"]));

    return redirect(`/admindashboard/products`);
    
  };
