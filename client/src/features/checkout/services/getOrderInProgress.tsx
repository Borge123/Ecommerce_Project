export async function GetOrderInProgress() {
  try {
    const res = await fetch("http://api.app.localhost:3000/orderinprogress", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    //const data = await res.json();

    return res.status;
  } catch (error) {
    console.log(error);
  }
}
