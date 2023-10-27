import { GetUserInfo } from "../../../features/userDashBoard/services/getUserInfo";

export async function UserInfoLoader() {
  const user = await GetUserInfo();

  return { user };
}
