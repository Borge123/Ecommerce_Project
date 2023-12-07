import Navigation from "../components/ui/navigation/Navigation";
import Footer from "../components/ui/footer/Footer";
import "./Layoutstyles.css";
import { Outlet } from "react-router-dom";
import ModalContainer from "../features/products/components/modalContainer";
import { useState } from "react";
export default function Layout() {
  //TODO test if its possible to open the modal from multiple different routes
  //const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Navigation />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <ModalContainer />

      <Footer />
    </div>
  );
}
