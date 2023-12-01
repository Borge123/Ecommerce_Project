import { createContext, useReducer, type Dispatch, useContext } from "react";
import ProductModalReducer from "../reducer/productModalReducer";

export const ProductModalContext = createContext(null);
export const ProductModalDispatchContext = createContext(null);
export function ProductModalProvider({ children }) {
  const [modal, dispatch] = useReducer(ProductModalReducer, initialState);

  return (
    <ProductModalContext.Provider value={modal}>
      <ProductModalDispatchContext.Provider value={dispatch as Dispatch}>
        {children}
      </ProductModalDispatchContext.Provider>
    </ProductModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ProductModalContext);
}

export function useModalDispatch() {
  return useContext(ProductModalDispatchContext);
}

const initialState = {
  status: "closed",
};
