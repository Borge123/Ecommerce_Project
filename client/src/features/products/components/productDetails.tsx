import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductModal from "./productModal";
import { useModal, useModalDispatch } from "../context/productModalContext";

export default function ProductDetails() {
  //const [modalShow, setModalShow] = useOutletContext();

  const modal = useModal();

  const dispatch = useModalDispatch();
  const navigate = useNavigate();
  //TODO drop modal and create a product details page instead
  return (
    <>
      <ProductModal
        show={modal.status}
        product={modal.product}
        onHide={() => {
          dispatch({
            type: "close",
            product: modal.product,
          });
          //navigate(-1);
        }}
      />
    </>
  );
}
