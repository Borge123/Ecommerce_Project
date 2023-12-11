import { useCart } from "../../../features/cart/context/cart";
export async function CheckoutLoader() {
  const cart = useCart();
  console.log(cart);

  const order = JSON.parse(cart);
  return { order };
}
