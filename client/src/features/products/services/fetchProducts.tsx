export default async function fetchProducts() {
  try {
    const res = await fetch("http://api.app.localhost:3000/items", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return;
    const data = await res.json();
    console.log(data);

    return data.Items;
  } catch (error) {
    console.log(error);
  }
}
