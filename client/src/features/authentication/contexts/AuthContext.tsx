import { createContext, useReducer, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // TODO: test reducer and usestate
  const [token, setToken] = useState(null);
}
