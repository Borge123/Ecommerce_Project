import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createImageSrc } from "../helpers/createImageSrc";
import { useLoaderData } from "react-router-dom";
import { useCartDispatch, useCart } from "../../cart/context/cart";
import { useState, useEffect } from "react";
import "../../cart/styles/cart.css";
import { ProductLoader } from "../../../routes/public/products/productLoader";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useModal } from "../context/productModalContext";
export default function ProductModal(props) {
  const url = new URL(window.location.href);
  //TODO find out how to only use productloader if url changes
  const lastSlash = url.pathname.lastIndexOf("/");
  const id = url.pathname.slice(lastSlash + 1, url.pathname.length);
  const modal = useModal();
  const params = {
    _id: id,
  };
  //const testProduct = ProductLoader({ params });

  // testProduct.then((value) => {
  //   console.log({ value });
  // });

  //const product = props.product;
  const product = props.product;

  //console.log(props);
  //console.log(props);

  const dispatch = useCartDispatch();
  const cart = useCart();
  const [sku, setSku] = useState(product.skus[0].options.color);
  // console.log(product);

  console.log(sku);
  //TODO figure out a better way to keep currentsku synced up as sku is not updated properly at the moment
  let currentSku = product.skus.find((el) => el.options.color === sku);

  // useEffect(() => {
  //   setSku(product.skus[0].options.color);
  // }, [modal, cart]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as={"h2"} id="contained-modal-title-vcenter">
          {product.item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{product.item.description}</p>
        <img
          className="img-fluid"
          src={createImageSrc(product.item.img_url)}
          alt={product.item.img_url}
        />
        <>
          {product.skus.length >= 1 ? (
            <Form.Select
              onChange={(e) => {
                setSku(e.target.value);
              }}
              aria-label="Select type"
            >
              {product.skus.map((type) => (
                <option key={type._id}>{type.options.color}</option>
              ))}
            </Form.Select>
          ) : (
            ""
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        <>
          {!cart.find(
            (item) => item._id === product._id && item.sku === currentSku.sku
          ) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "add",
                  item: {
                    quantity: 0,
                    _id: product._id,
                    name: product.item.name,
                    src: product.item.img_url,
                    description: product.item.description,
                    price: currentSku.price,
                    sku: currentSku.sku,
                  },
                });
              }}
              variant="primary"
            >
              Add to cart
            </Button>
          ) : (
            <>
              <div className="ws-product-vertical__price ws-product-vertical__price--discounted">
                {currentSku.price} kr
              </div>
              <div className="ws-product__quantity-picker">
                <div className="ws-add-to-cart ws-add-to-cart--small">
                  <div className="ws-add-to-cart__quantity-stepper">
                    <span className="ws-add-to-cart__quantity ws-add-to-cart__quantity--withselect">
                      <span className="ws-quantity-picker">
                        <select
                          title="Endre mengde Pytt i Panne"
                          aria-label="1 stk, endre mengde Pytt i Panne"
                          id="ws-quantity-picker"
                          name="ws-quantity-picker"
                          className="ws-quantity-picker__select"
                        >
                          <option value="0">Fjern</option>
                          <option value="1">1 stk</option>
                          <option value="10">10 stk</option>
                          <option value="20">20 stk</option>
                          <option value="30">30 stk</option>
                          <option value="40">40 stk</option>
                          <option value="50">50 stk</option>
                          <option value="60">60 stk</option>
                          <option value="70">70 stk</option>
                          <option value="80">80 stk</option>
                          <option value="90">90 stk</option>
                          <option value="100">100 stk</option>
                        </select>
                        <span
                          className="ws-quantity-picker__value ws-quantity-picker__value--no-unit"
                          aria-hidden="true"
                        >
                          {
                            cart.find((item) => item.sku === currentSku.sku)
                              .quantity
                          }
                        </span>
                      </span>
                    </span>

                    <button
                      className="ws-add-to-cart__button ws-add-to-cart__button--remove"
                      type="button"
                      title="Fjern fra handlevognen"
                      aria-label="Fjern Pytt i Panne fra handlevognen"
                      onClick={() => {
                        // if(cartItem.quantity === 1){

                        // }
                        dispatch({
                          type: "remove",
                          item: {
                            quantity: 0,
                            _id: product._id,
                            name: product.item.name,
                            src: product.item.img_url,
                            description: product.item.description,
                            sku: currentSku.sku,
                            price: currentSku.price,
                          },
                        });
                      }}
                    >
                      <span
                        className="ngr-icon ngr-icon--minus ws-add-to-cart__button__inner"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <FaMinus className="ngr-icon__svg" />
                      </span>
                      <span className="ws-add-to-cart__button-caption">
                        {" "}
                        Remove from cart
                      </span>
                    </button>
                    <button
                      className="ws-add-to-cart__button ws-add-to-cart__button--increase"
                      type="button"
                      title="Add to cart"
                      aria-label="add"
                      onClick={() => {
                        dispatch({
                          type: "add",
                          item: {
                            _id: product._id,
                            name: product.item.name,
                            src: product.item.img_url,
                            description: product.item.description,
                            sku: currentSku.sku,
                            price: currentSku.price,
                          },
                        });
                      }}
                    >
                      <span
                        className="ngr-icon ngr-icon--plus ws-add-to-cart__button__inner"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <FaPlus className="ngr-icon__svg" />
                      </span>
                      <span className="ws-add-to-cart__button-caption">
                        {" "}
                        add to cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      </Modal.Footer>
    </Modal>
  );
}
