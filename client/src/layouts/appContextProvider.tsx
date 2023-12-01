import { combineComponents } from "./combinedComponents";
import { AuthProvider } from "../features/authentication/context/AuthContext";
import { CartProvider } from "../features/cart/context/cart";
import { ProductModalProvider } from "../features/products/context/productModalContext";
const providers = [AuthProvider, CartProvider, ProductModalProvider];
export const AppContextProvider = combineComponents(...providers);
