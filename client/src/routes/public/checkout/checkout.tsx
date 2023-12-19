import { CheckoutLoader } from "./checkoutLoader";
import { CheckoutForm } from "../../../features/checkout/components/checkoutform";
import CheckoutPage from "../../../pages/CheckoutPage";
import { CartSummary } from "../../../features/checkout/components/cartsummary";
export const checkout = {
  path: "checkout",
  element: <CheckoutPage />,
  //loader: CheckoutLoader,

  children: [
    {
      path: "",
      element: <CartSummary />,
    },

    {
      path: "/checkout/form",
      element: <CheckoutForm />,
    },
  ],
};
