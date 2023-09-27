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
      return;
    }
    const data = await res.json();
    const jwtToken = data.jwtToken;

    sessionStorage.setItem("jwtToken", jwtToken);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo() {
  try {
    const authRes = await fetch("http://api.app.localhost:3000/protected", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!authRes.ok) return;
    const data = await authRes.json();

    return data.user;
  } catch (error) {
    console.log(error);
  }
}
