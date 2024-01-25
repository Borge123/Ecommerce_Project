export async function GetAllOrders() {
  try {
    const authRes = await fetch("http://api.app.localhost:3000/orders", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (!authRes.ok) return;
    const data = await authRes.json();

    return data.Orders;
  } catch (error) {
    console.log(error);
  }
}
