type sku = {
  _id: string;
  sku: string;
  newsku: string;
  price: number;
  stock_quantity: number;
  options: options;
};
type options = {
  size: string;
  color: string;
  img_url: string;
};
export async function UpdateSku(sku: sku) {
  try {
    const res = await fetch("http://api.app.localhost:3000/updatesku", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sku),
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
