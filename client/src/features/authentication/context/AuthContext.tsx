import { useContext, createContext, useReducer, type Dispatch } from "react";
import authReducer from "../reducer/authReducer";
export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);
export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <UserContext.Provider value={authState}>
      <UserDispatchContext.Provider value={dispatch as Dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

const initialState = [
  {
    status: "idle",
    user: null,
    error: null,
  },
];
