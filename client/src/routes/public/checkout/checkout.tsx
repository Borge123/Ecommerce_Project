import { CheckoutLoader } from "./checkoutLoader";
import { CheckoutForm } from "../../../features/checkout/components/checkoutform";
import CheckoutPage from "../../../pages/CheckoutPage";
import { CartSummary } from "../../../features/checkout/components/cartsummary";
import { PaymentForm } from "../../../features/checkout/components/paymentForm";
import { OrderCreated } from "../../../features/checkout/components/orderCreated";
import { ExistingOrderInProgressLoader } from "./existingOrderInProgressLoader";
import { action as paymentAction } from "./paymentAction";
import { queryClient } from "../../../context/queryProvider";
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
      path: "/checkout/billinginfo",
      element: <CheckoutForm />,
    },
    {
      path: "/checkout/payment",
      element: <PaymentForm />,
      //loader: ExistingOrderInProgressLoader,
      action: paymentAction(queryClient),
    },

    {
      path: "/checkout/ordercreated",
      element: <OrderCreated />,
    },
  ],
};
