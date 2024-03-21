import { productsRoute } from "./products/productsRoot";
import { product } from "./products/product";
import { checkout } from "./checkout/checkout";
import { loginRoute } from "./login/loginRoot";
import { signupRoute } from "./signup/signupRoot";
import { accountRoute } from "./userDashBoard/accountRoot";
import { adminDashboardRoute } from "../admin/adminDashboard/adminDashboardroot";
import { searchRoute } from "./search/searchRoot";
export const publicRoutes = [
  productsRoute,
  product,
  loginRoute,
  signupRoute,
  accountRoute,
  checkout,
  searchRoute,
];
