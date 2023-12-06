import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductModal from "./productModal";
import { useModal, useModalDispatch } from "../context/productModalContext";
import { useCart } from "../../cart/context/cart";
export default function ModalContainer() {
  //const [modalShow, setModalShow] = useOutletContext();
  const cart = useCart();

  const modal = useModal();

  const dispatch = useModalDispatch();
  const navigate = useNavigate();
  //TODO drop modal and create a product details page instead
  return (
    <>
      {modal.product.skus ? (
        <ProductModal
          show={modal.status}
          product={modal.product}
          onHide={() => {
            dispatch({
              type: "close",
              product: modal.product,
            });
            navigate(-1);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}
