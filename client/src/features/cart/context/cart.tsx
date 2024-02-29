import React, {
  createContext,
  useEffect,
  useReducer,
  type Dispatch,
  useContext,
} from "react";
import CartReducer from "../reducer/cartReducer";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
export const CartContext = createContext(null);
export const CartDispatchContext = createContext(null);
export function CartProvider({ children }) {
  const { getItem, setItem } = useLocalStorage();
  const [cart, dispatch] = useReducer(CartReducer, initialState.cart);

  useEffect(() => {
    const data = getItem("cart");
    console.log("test if error triggers reload");

    if (data) {
      dispatch({
        type: "load",
        cart: JSON.parse(data),
      });
    }
  }, []);
  useEffect(() => {
    const data = getItem("cart");
    if (data) {
      setItem("cart", JSON.stringify(cart));
      const parsedData = JSON.parse(localStorage.getItem("cart"));
      setItem("cart", JSON.stringify(cart));
    } else {
      setItem("cart", JSON.stringify([]));
    }
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
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};
