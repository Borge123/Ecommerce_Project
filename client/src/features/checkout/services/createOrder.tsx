type order = {
  user_id: string;
  status: string;
  items: [item];
  total: number;
};
type item = {
  sku: string;
  quantity: number;
  price: number;
  options: { size: string; color: string; img_url: string };
};

export default async function createOrder(order: order) {
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

    if (!res.ok) {
      console.log(data);
      return;
    }
    console.log(data);
    return { data };
  } catch (error) {
    console.log(error);
  }
}
