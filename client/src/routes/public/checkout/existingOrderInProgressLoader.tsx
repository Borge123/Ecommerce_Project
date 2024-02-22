import { GetOrderInProgress } from "../../../features/checkout/services/getOrderInProgress";
export async function ExistingOrderInProgressLoader() {
  const orderInProgress = await GetOrderInProgress();

  //returns true or false based on if an order in progress exists
  if (orderInProgress === 200) {
    return true;
  }
  return false;
}
