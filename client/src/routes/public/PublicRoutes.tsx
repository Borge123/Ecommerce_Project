import { productsRoute } from "./products/productsRoot";
import { product } from "./products/product";
import { checkout } from "./checkout/checkout";
import { loginRoute } from "./login/loginRoot";
import { signupRoute } from "./signup/signupRoot";
import { accountRoute } from "./userDashBoard/accountRoot";
export const publicRoutes = [
  productsRoute,
  product,
  loginRoute,
  signupRoute,
  accountRoute,
  checkout,
];
