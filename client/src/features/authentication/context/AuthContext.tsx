import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  type Dispatch,
} from "react";
import authReducer from "../reducer/authReducer";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);
export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    //check if user already exists in localstorage on render
    if (user) {
      dispatch({
        type: "setuser",
        status: "success",
        user: JSON.parse(user),
        error: null,
      });
    }
  }, []);
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

const initialState = {
  status: "idle",
  user: null,
  error: null,
};
