import {
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
  //TODO figure out why cart defaults back to load state after crash
  useEffect(() => {
    console.log("effect 1");

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
    console.log("effect 2");
    //TODO update with the data from localstorage

    //TODO find out how to update cart without endless reloads

    setItem("cart", JSON.stringify(cart));
    const data = getItem("cart");
    const parsedData = JSON.parse(data);
    //console.log(parsedData);

    console.log(cart);
    console.log(parsedData);
    if (parsedData.length > 0) {
      // dispatch({
      //   type: "load",
      //   cart: cart,
      // });
      //console.log("test");
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
