//import { useUserDispatch } from "../context/AuthContext";
type credentials = {
  email: string;

  password: string;
};
async function Login(credentials: credentials) {
  // dispatch({
  //   status: "resolved",
  //   user: userInfo,
  //   error: null,
  // });
  //const { login } = useAuth();
  try {
    const res = await fetch("http://api.app.localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      return;
    }
    const jwtToken = data.jwtToken;

    sessionStorage.setItem("jwtToken", jwtToken);
    const userInfo = await getUserInfo();

    if (!userInfo) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

const getUserInfo = async () => {
  const authRes = await fetch("http://api.app.localhost:3000/protected", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!authRes.ok) return;

  return authRes.json();
};
export { Login };
