import { GetAllUsers } from "./getAllUsers";
const users = await GetAllUsers();

export async function GetUser(id) {
  //only call once on first render

  const user = users.find((user) => user._id === id);
  return user ?? null;
}
