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

    //only give item skus in stock
    for (let i = 0; i < data.Items.length; i++) {
      const skusInStock = data.Items[i].skus.filter(
        (el) => el.stock_quantity > 0
      );
      data.Items[i].skus = skusInStock;
    }

    return data.Items;
  } catch (error) {
    console.log(error);
  }
}
