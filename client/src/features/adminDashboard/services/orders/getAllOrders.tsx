export async function GetAllOrders() {
  try {
    const res = await fetch("http://api.app.localhost:3000/orders", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    if (!res.ok) {
      // const status = res.status;
      // throw new Error(status + " " + "Error");
      return;
    }
    const data = await res.json();

    return data.Orders;
  } catch (error) {
    console.log(error);
  }
}
