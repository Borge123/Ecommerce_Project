import { combineComponents } from "./combinedComponents";
import { AuthProvider } from "../features/authentication/context/AuthContext";
import { CartProvider } from "../features/cart/context/cart";
const providers = [AuthProvider, CartProvider];
export const AppContextProvider = combineComponents(...providers);
