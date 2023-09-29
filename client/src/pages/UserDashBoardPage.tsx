import UserDashBoard from "../features/userDashBoard/components/userDashBoard";
import ProtectedLayout from "../layouts/ProtectedLayout";

export default function UserDashBoardPage() {
  return (
    <ProtectedLayout>
      <UserDashBoard />
    </ProtectedLayout>
  );
}
