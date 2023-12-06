import { productsRoute } from "./products/productsRoot";
import { product } from "./products/product";
import { producttest } from "./products/producttest";
import { loginRoute } from "./login/loginRoot";
import { signupRoute } from "./signup/signupRoot";
import { accountRoute } from "./userDashBoard/accountRoot";
export const publicRoutes = [
  productsRoute,
  product,
  //producttest,
  loginRoute,
  signupRoute,
  accountRoute,
];
