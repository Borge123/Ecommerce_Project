export async function CancelOrder(order) {
  try {
    const res = await fetch("http://api.app.localhost:3000/cancelOrder", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      credentials: "include",
    });

    return res.status;
  } catch (error) {
    console.error(error);
  }
}
