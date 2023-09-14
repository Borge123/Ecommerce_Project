import { useOutletContext, useNavigate } from "react-router-dom";
import ProductModal from "./productModal";

export default function ProductDetails() {
  const [modalShow, setModalShow] = useOutletContext();
  const navigate = useNavigate();
  return (
    <ProductModal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        navigate(-1);
      }}
    />
  );
}
