type user = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
const createUser = async (user: user) => {
  try {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export { createUser };
