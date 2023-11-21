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
  const [cart, dispatch] = useReducer(cartReducer, initialState.cart);

  useEffect(() => {
    setItem("cart", JSON.stringify(cart));
    const data = getItem("cart");
    const parsedData = JSON.parse(data);
    if (parsedData.length > 0) {
      console.log("data");
      //setItem("cart", JSON.parse(data));
      //console.log(JSON.parse(data));
      dispatch({
        type: "load",
        cart: parsedData,
      });
    } else {
      console.log("no data");
    }
  }, []);
  useEffect(() => {
    //TODO update with the data from localstorage

    //TODO find out how to update cart

    setItem("cart", JSON.stringify(cart));
    const data = getItem("cart");
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    console.log(parsedData.length);
    if (parsedData.length > 0) {
      // dispatch({
      //   type: "update",
      //   cart: cart,
      // });
      console.log("test");
    }
    //dispatch update every time cart changes
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
const data = localStorage.getItem("cart");
const parsedData = JSON.parse(data);

const initialState = {
  cart: parsedData ? parsedData : [],
};
