import Layout from "./layouts/Layout";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { AppContextProvider } from "./layouts/appContextProvider";
export default function App() {
  return (
    <AppContextProvider>
      <Layout></Layout>
    </AppContextProvider>
  );
}
