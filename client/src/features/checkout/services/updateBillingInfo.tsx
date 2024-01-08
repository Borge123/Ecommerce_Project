type billinginfo = {
  address: string;
  city: string;
  zip: string;
  house_number: string;
};
export async function updateBillingInfo(billinginfo: billinginfo) {
  try {
    console.log(billinginfo);

    const res = await fetch("http://api.app.localhost:3000/addBillingInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(billinginfo),
    });
    //const data = await res.json();

    return res.status;
  } catch (error) {
    console.log(error);
  }
}
