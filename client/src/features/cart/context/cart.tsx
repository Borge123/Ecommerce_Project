import {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  useContext,
} from "react";
import cartReducer from "../reducer/cartReducer";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);
export function CartProvider({ children }) {
  const { getItem, setItem } = useLocalStorage();
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    //dispatch update every time cart changes

    setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch as Dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

const initialState = {
  cart: null,
};
