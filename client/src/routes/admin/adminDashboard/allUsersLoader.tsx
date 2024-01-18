import { GetAllUsers } from "../../../features/adminDashboard/services/getAllUsers";
export async function AllUsersLoader() {
  const users = await GetAllUsers();

  return { users };
}
