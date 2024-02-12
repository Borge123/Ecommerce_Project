import { redirect } from "react-router-dom";
import { UpdateSku } from "../../../features/adminDashboard/services/products/updateSku";
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const options = {
      size: formData.get("options.size"),
      color: formData.get("options.color"),
      img_url: formData.get("options.img_url"),
    };
    const data = {
      _id: params._id,
      sku: params.sku,
      newsku: formData.get("newsku"),
      price: formData.get("price"),
      stock_quantity: formData.get("stock_quantity"),
      options: options,
    };

    // data._id = params._id;
    // data.sku = params.sku;
    console.log(data);

    await UpdateSku(data);
    //await queryClient.invalidateQueries({ queryKey: ["product", params._id] });
    await queryClient.refetchQueries({ queryKey: ["products"] });

    await queryClient.invalidateQueries({
      queryKey: ["product"],
    });
    console.log(await queryClient.getQueriesData(["product"]));

    return redirect(`/admindashboard/products`);
  };
