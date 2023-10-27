import { decodeJwt } from "../../../helpers/decodeJwt";
type credentials = {
  email: string;

  password: string;
};
export async function Login(credentials: credentials) {
  try {
    const res = await fetch("http://api.app.localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401) {
        return res.status;
      }
      return;
    }
    const data = await res.json();

    const jwtToken = data.jwtToken;
    console.log("loggin in");

    const expires = data.jwtExpire;

    sessionStorage.setItem("jwtToken", jwtToken);

    localStorage.setItem("jwtExpire", expires);
    const returnObj = {
      status: res.status,
      user: data.payload,
    };

    if (data) return returnObj;
  } catch (error) {
    console.error(error);
  }
}
