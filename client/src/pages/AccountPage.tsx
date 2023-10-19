import UserDashBoard from "../features/userDashBoard/components/account";
import ProtectedLayout from "../layouts/ProtectedLayout";

export default function UserDashBoardPage() {
  return (
    <ProtectedLayout>
      <UserDashBoard />
    </ProtectedLayout>
  );
}
