const logout = async () => {
  const res = await fetch("http://api.app.localhost:3000/logout", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },

    credentials: "include",
  });
  console.log("clicked");
  if (!res.ok) return;

  return res.json();
};

export { logout };
