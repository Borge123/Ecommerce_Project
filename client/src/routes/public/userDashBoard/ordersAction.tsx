import { CancelOrder } from "../../../features/userDashBoard/services/cancelOrder";
import { redirect } from "react-router-dom";
export const action = async ({ request, params }) => {
  const data = await request.json();

  const res = await CancelOrder(data);
  if (res != 200) {
    throw new Error("cancel order error");
  }

  return redirect(`/account/orders`);
};
