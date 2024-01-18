export async function GetAllUsers() {
  try {
    const authRes = await fetch("http://api.app.localhost:3000/users", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (!authRes.ok) return;
    const data = await authRes.json();

    return data.Users;
  } catch (error) {
    console.log(error);
  }
}
