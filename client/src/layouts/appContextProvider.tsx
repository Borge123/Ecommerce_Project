import { combineComponents } from "./combinedComponents";
import { AuthProvider } from "../features/authentication/context/AuthContext";
import { CartProvider } from "../features/cart/context/cart";
import { ProductModalProvider } from "../features/products/context/productModalContext";
import { QueryProvider } from "../context/queryProvider";
const providers = [
  QueryProvider,
  AuthProvider,
  CartProvider,
  ProductModalProvider,
];
export const AppContextProvider = combineComponents(...providers);
