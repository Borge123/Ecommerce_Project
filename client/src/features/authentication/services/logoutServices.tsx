const logout = async () => {
  try {
    const res = await fetch("http://api.app.localhost:3000/logout", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    if (!res.ok) return;

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { logout };
