type item = {
  _id: string;
  name: string;
  description: string;
  img_url: string;
};

export async function UpdateItem(item: item) {
  try {
    const res = await fetch("http://api.app.localhost:3000/updateitem", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
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
