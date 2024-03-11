import { CancelOrder } from "../../../features/userDashBoard/services/cancelOrder";
import { redirect } from "react-router-dom";
import { queryClient } from "../../../context/queryProvider";
export const action = async ({ request, params }) => {
  const data = await request.json();

  const res = await CancelOrder(data);
  if (res != 200) {
    throw new Error("cancel order error");
  }
  await queryClient.refetchQueries({ queryKey: ["orders"] });
  return redirect(`/account`);
};
