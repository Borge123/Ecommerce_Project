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

    // setItem("jwtToken", jwtToken);
    if (res.ok) {
      const data = await res.json();
      const jwtToken = data.jwtToken;
      const now = new Date();
      const jwtExpire = now.setTime(now.getTime() + 0.01 * 3600 * 1000);

      localStorage.setItem("jwtExpire", jwtExpire);

      return jwtToken;
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
