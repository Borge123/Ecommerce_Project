export async function GetUserInfo() {
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
