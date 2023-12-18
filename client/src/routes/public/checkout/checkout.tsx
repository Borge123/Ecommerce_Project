import { CheckoutLoader } from "./checkoutLoader";
import { CheckoutForm } from "../../../features/checkout/components/checkoutform";
import CheckoutPage from "../../../pages/CheckoutPage";
export const checkout = {
  path: "checkout",
  element: <CheckoutPage />,
  //loader: CheckoutLoader,

  children: [
    {
      path: "/checkout/summary",
      element: <h1>Cart summary</h1>,
    },

    {
      path: "/checkout/form",
      element: <CheckoutForm />,
    },
  ],
};
