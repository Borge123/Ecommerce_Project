import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  type Dispatch,
} from "react";
import authReducer from "../reducer/authReducer";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { refreshToken } from "../services/refreshTokenService";
import { useLocation } from "react-router-dom";

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);
export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { getItem, setItem } = useSessionStorage();
  const getUserItem = useLocalStorage();
  const getJwtExpiration = useLocalStorage();
  const authStateUser = useUser();
  const now = new Date();
  //hook to track route changes
  const location = useLocation();
  useEffect(() => {
    //TODO test if this can be moved to its own hook
    const user = getUserItem.getItem("user");
    let expires = getJwtExpiration.getItem("jwtExpire");
    console.log(expires);
    console.log(now.getTime());

    if (expires < now.getTime() && user) {
      console.log("need to refresh token");
      refreshToken().then((value) => {
        dispatch({
          type: "refreshtoken",
          status: "success",
          user: JSON.parse(user),
          token: value,
          error: null,
        });

        expires = getJwtExpiration.getItem("jwtExpire");
        setItem("jwtToken", value);
      });
    }
  }, [location]);
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
  token: null,
};
