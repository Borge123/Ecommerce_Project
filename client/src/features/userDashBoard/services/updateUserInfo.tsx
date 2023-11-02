type info = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
export async function UpdateUserInfo(info: info) {
  try {
    const res = await fetch("http://api.app.localhost:3000/updateuser", {
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

    const returnObj = {
      status: res.status,
      user: data.payload,
    };

    if (data) return returnObj;
  } catch (error) {
    console.error(error);
  }
}
