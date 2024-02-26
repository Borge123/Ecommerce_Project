import { GetAllOrders } from "./getAllOrders";
import { queryClient } from "../../../../context/queryProvider";
export async function GetOrder(id) {
  const orders =
    (await queryClient.getQueryData(["orders"])) ?? (await GetAllOrders());
  if (orders) {
    const order = orders.find((order) => order._id === id);
    return order ?? null;
  }
}
