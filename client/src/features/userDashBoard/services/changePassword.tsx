type info = {
  oldPassword: string;
  password: string;
};
export async function ChangePassword(info: info) {
  try {
    const res = await fetch("http://api.app.localhost:3000/updatepassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401) {
        return res.status;
      }
      return;
    }
    const data = await res.json();

    if (data) return res.status;
  } catch (error) {
    console.error(error);
  }
}
