import { Checkout } from "../features/checkout/components/checkout";
import ProtectedLayout from "../layouts/ProtectedLayout";
export default function CheckoutPage() {
  //TODO figure out why ProtectedLayout loses Auth state on reload
  return <Checkout />;
}
