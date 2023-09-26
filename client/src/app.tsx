import Layout from "./layouts/Layout";
import { AuthProvider } from "./features/authentication/context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}
