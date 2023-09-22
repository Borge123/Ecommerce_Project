type credentials = {
  email: string;

  password: string;
};
const login = async (credentials: credentials) => {
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
    await getUserInfo();

    if (!getUserInfo) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

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
export { login };
