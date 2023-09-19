type credentials = {
  email: string;

  password: string;
};
const login = async (credentials: credentials) => {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      return;
    }
    console.log(data.token);
  } catch (error) {
    console.log(error);
  }
};

export { login };
