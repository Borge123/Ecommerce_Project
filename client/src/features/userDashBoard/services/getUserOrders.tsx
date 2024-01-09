export async function GetUserOrders() {
  try {
    const res = await fetch("http://api.app.localhost:3000/alluserorders", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (!res.ok) return;
    const data = await res.json();

    return data.Orders;
  } catch (error) {
    console.log(error);
  }
}
