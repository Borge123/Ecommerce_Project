import Navigation from "../components/ui/navigation/Navigation";
import Footer from "../components/ui/footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}
