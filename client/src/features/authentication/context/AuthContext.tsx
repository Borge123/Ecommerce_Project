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
  //TODO figure out why auth state seems to just randomly dissapear on reload
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const { setItem, getItem } = useSessionStorage();
  const getUserItem = useLocalStorage();
  const getJwtExpiration = useLocalStorage();

  const now = new Date();
  //hook to track route changes
  const location = useLocation();

  useEffect(() => {
    const user = getUserItem.getItem("user");
    let expires = getJwtExpiration.getItem("jwtExpire");
    //if expired and user exists in authState

    if (expires < now.getTime() && user != null) {
      refreshToken().then((value) => {
        if (value) {
          dispatch({
            type: "refreshtoken",
            status: "success",
            user: JSON.parse(user),
            token: value,
            error: null,
          });
          console.log(value);

          expires = getJwtExpiration.getItem("jwtExpire");
          setItem("jwtToken", value);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("jwtExpire");
          dispatch({
            type: "setuser",
            status: "idle",
            user: null,
            error: null,
            token: null,
          });
        }
      });
    } else if (user != null && authState.user === null) {
      dispatch({
        type: "setuser",
        status: "success",
        user: JSON.parse(user),
        token: getItem("jwtToken"),
        error: null,
      });
      console.log(getItem("jwtToken"));
    }
  }, [location, authState]);
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
