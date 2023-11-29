import { useOutletContext, useNavigate } from "react-router-dom";
import ProductModal from "./productModal";

export default function ProductDetails() {
  const [modalShow, setModalShow] = useOutletContext();
  const navigate = useNavigate();
  //TODO drop modal and create a product details page instead
  return (
    <>
      <ProductModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate(-1);
        }}
      />
    </>
  );
}
