import { GetUserOrders } from "../../../features/userDashBoard/services/getUserOrders";

export async function UserOrdersLoader() {
  const orders = await GetUserOrders();

  return { orders };
}
