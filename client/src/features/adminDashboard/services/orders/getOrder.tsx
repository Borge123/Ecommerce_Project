import { GetAllOrders } from "./getAllOrders";
const orders = await GetAllOrders();

export async function GetOrder(id) {
  //only call once on first render

  const order = orders.find((order) => order._id === id);
  return order ?? null;
}
