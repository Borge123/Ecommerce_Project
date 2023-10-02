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
  //hook to track route changes
  const location = useLocation();
  useEffect(() => {
    const now = new Date();
    now.getTime();
    const user = getUserItem.getItem("user");
    const token = getItem("jwtToken");
    const expires = getJwtExpiration.getItem("jwtExpire");
    console.log("test");

    //const user = getItem("user");
    if (expires < now.getTime() && user) {
      console.log("need to refresh token");
      refreshToken().then((value) => {
        dispatch({
          type: "refreshtoken",
          token: value,
        });
        console.log(value);
        getJwtExpiration.setItem("jwtExpire", value);
        setItem("jwtToken", value);
      });
    } else if (token && authState.user === null) {
      //Check if this can be moved somewhere else
      dispatch({
        type: "setuser",
        status: "success",
        user: JSON.parse(user),
        token: token,
        error: null,
      });
    }
    //check if user already exists in localstorage on render
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
