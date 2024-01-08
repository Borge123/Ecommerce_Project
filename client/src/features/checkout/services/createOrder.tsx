type order = {
  items: [item];
};
type item = {
  sku: string;
  quantity: number;
  price: number;
  options: { size: string; color: string; src: string };
};

export async function createOrder(order: order) {
  try {
    const res = await fetch("http://api.app.localhost:3000/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(order),
    });
    const data = await res.json();

    return res.status;
  } catch (error) {
    console.log(error);
  }
}
