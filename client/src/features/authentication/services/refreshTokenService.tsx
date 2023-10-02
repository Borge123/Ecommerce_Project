import { useSessionStorage } from "../../../hooks/useSessionStorage";
import { useUserDispatch } from "../context/AuthContext";
export const refreshToken = async () => {
  try {
    const res = await fetch("http://api.app.localhost:3000/refresh", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    if (!res.ok) {
      return;
    }
    const data = await res.json();
    const jwtToken = data.jwtToken;
    // setItem("jwtToken", jwtToken);
    if (!res.ok) return;

    return jwtToken;
  } catch (error) {
    console.log(error);
  }
};
