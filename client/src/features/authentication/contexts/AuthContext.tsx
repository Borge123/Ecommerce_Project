import { createContext, useReducer, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
}
