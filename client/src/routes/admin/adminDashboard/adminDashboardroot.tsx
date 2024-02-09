import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage";
import ErrorPage from "../../../pages/ErrorPage";
import { AdminLanding } from "../../../features/adminDashboard/components/adminLanding";
import { Users } from "../../../features/adminDashboard/components/users/users";
import { AllUsersLoader } from "./users/allUsersLoader";
import { queryClient } from "../../../context/queryProvider";
import { UserLoader } from "./users/userLoader";
import { User } from "../../../features/adminDashboard/components/users/user";
import { Orders } from "../../../features/adminDashboard/components/orders/orders";
import { AllOrdersLoader } from "./orders/allOrdersLoader";
import { OrderLoader } from "./orders/orderLoader";
import { Order } from "../../../features/adminDashboard/components/orders/order";
import { Products } from "../../../features/adminDashboard/components/products/products";
import { ProductsLoader } from "../../public/products/productsLoaders";
import { Product } from "../../../features/adminDashboard/components/products/product";
import { ProductLoader } from "../../public/products/productLoader";
import { SkuLoader } from "./products/productSkuLoader";
import ProductEdit from "../../../features/adminDashboard/components/products/productEdit";
import SkuEdit from "../../../features/adminDashboard/components/products/skuEdit";
import { action } from "../../public/products/productAction";
import { QueryClient } from "react-query";
export const adminDashboardRoute = {
  path: "/admindashboard",
  element: <AdminDashboardPage />,
  errorElement: <ErrorPage />,
  children: [
    {
      index: true,
      element: <h1>Test admin index</h1>, //Will load in outlet when nothing else is loaded
    },
    {
      path: "",
      element: <AdminLanding />,
    },
    {
      path: "users",
      element: <Users />,
      loader: AllUsersLoader(queryClient),
    },
    {
      path: "/admindashboard/users/:_id",
      element: <User />,
      loader: UserLoader(queryClient),
    },
    {
      path: "products",
      element: <Products />,
      loader: ProductsLoader(queryClient),
    },
    {
      path: "/admindashboard/products/:_id",
      element: <Product />,
      loader: ProductLoader(queryClient),
    },
    {
      path: "/admindashboard/products/:_id/edit",
      element: <ProductEdit />,
      loader: ProductLoader(queryClient),
      action: action(queryClient),
    },
    {
      path: "/admindashboard/products/:_id/:sku/edit",
      element: <SkuEdit />,
      loader: SkuLoader(queryClient),
    },
    {
      path: "orders",
      element: <Orders />,
      loader: AllOrdersLoader(queryClient),
    },
    {
      path: "/admindashboard/orders/:_id",
      element: <Order />,
      loader: OrderLoader(queryClient),
    },
  ],
};
