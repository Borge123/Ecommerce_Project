import "../styles/cart.css";
import { useEffect } from "react";

import { FaXmark } from "react-icons/fa6";

import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useCartDispatch, useCart } from "../context/cart";
import { ProductLoader } from "../../../routes/public/products/productLoader";
import { CartItems } from "./cartItems";
import {
  useModal,
  useModalDispatch,
} from "../../products/context/productModalContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useLocation } from "react-router-dom";
export function Cart() {
  const { getItem, setItem } = useLocalStorage();
  const cart = useCart();
  const dispatch = useCartDispatch();
  const [cartState, setCartState] = useState("closed");
  //TODO count from localstorage number of items in cart and set cart to closed if 0 items
  //TODO Get products data and find product based on id or sku in cart and use the data to be able to always know quantity per sku of an item
  const itemsInCart = cart?.length;
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const location = useLocation();
  const modalDispatch = useModalDispatch();
  const modal = useModal();

  useEffect(() => {
    const updatedCart = getItem("cart");
    dispatch({
      type: "load",
      cart: JSON.parse(updatedCart),
    });
  }, [location]);
  // useEffect(() => {
  //   const cartImg = document.querySelectorAll(".ws-image img");

  //   cartImg.forEach((item) => {
  //     item.complete ? item.parentElement.classList.add("ws-image--loaded") : "";
  //   });
  // }, [cart]);
  return (
    <>
      <div className="cw-cart-area">
        <div className="cw-cart-button">
          <button
            className="ws-cart-button ws-cart-button--selected"
            type="button"
            title="cart"
            style={{ fontSize: "1rem" }}
            onClick={() => {
              if (cartState === "closed") {
                setCartState("open");
                document.querySelector("header")?.classList.add("open-cart");
              } else {
                setCartState("closed");
                document.querySelector("header")?.classList.remove("open-cart");
              }
            }}
          >
            <div className="ws-cart-button__cart-icon-wrapper">
              <span className="ws-cart-button__cart">
                <FaCartArrowDown
                  className="ngr-icon ngr-icon--cart-empty ws-cart-button__cart-icon"
                  color="black"
                  size={"1.8em"}
                />
                {}
                {/* <span
                  className="ngr-icon ngr-icon--carrot ws-cart-button__carrot-icon ws-cart-button__carrot-icon--has-items"
                  role="presentation"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="ngr-icon__svg">
                    <use href="/"></use>
                  </svg>
                </span> */}
              </span>
              {itemsInCart > 0 ? (
                <span className="ws-cart-button__count ws-cart-button__count--bottom-left">
                  <span className="ws-cart-button__count__text">
                    {itemsInCart}
                  </span>
                  <span className="ws-visually-hidden"> items in cart</span>
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="ws-cart-button__total ws-cart-button__total--has-total"></div>
          </button>
        </div>
        <div className="cw-cart-pane">
          <div className="cw-cart">
            <div className="ws-cart">
              <div className="ws-cart__header">
                <div className="ws-cart-intro">
                  <h2 className="ws-cart-intro__header">
                    Cart{" "}
                    <span className="ws-cart-intro__quantity">
                      {itemsInCart} products
                    </span>
                    <button
                      className="ngr-close-button ws-cart-intro__close-button"
                      type="button"
                      aria-label="Lukk"
                      onClick={() => {
                        document
                          .querySelector(".open-cart")
                          .classList.remove("open-cart");
                      }}
                    >
                      <span
                        className="ngr-icon ngr-icon--ngr-close"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <FaXmark />
                        <svg viewBox="0 0 13 13" className="ngr-icon__svg">
                          <use href="/"> </use>
                        </svg>
                      </span>
                    </button>
                  </h2>
                </div>
              </div>
              <div className="ws-cart-content">
                <div className="ws-cart-items__container">
                  <div className="ws-cart-items ws-cart-items--group ws-cart-items--type-general ws-cart-items--online-shopping-mode">
                    <h3 className="ws-cart-group-header">
                      <span className="ws-cart-group-header__title"> </span>
                    </h3>
                    {/* render cart items here */}
                    <CartItems
                      cart={cart}
                      onShow={() => {
                        console.log(modal);

                        modalDispatch({
                          type: "open",
                          product: modal.product,
                        });
                      }}
                      dispatch={dispatch}
                    ></CartItems>
                  </div>
                </div>
                <div className="ws-price-summary ws-cart__price-summary">
                  <div className="ws-summary-line ws-summary-line--calculator-total">
                    <div className="ws-summary-line__main">
                      <div className="ws-summary-line__header">
                        <span className="ws-summary-line__title ws-summary-line__title--is-bold">
                          Sum{" "}
                        </span>
                      </div>{" "}
                      <span className="ws-summary-line__price ws-summary-line__price--is-bold">
                        {total}&nbsp;kr
                      </span>
                    </div>{" "}
                  </div>
                  <div className="ws-summary-line ws-summary-line--handover-product">
                    {/* <div className="ws-summary-line__main"> */}
                    {/* <div className="ws-summary-line__header">
                        <span className="ws-summary-line__title">Plukk </span>
                      </div>{" "} */}
                    {/* <span className="ws-summary-line__price">49,00</span> */}
                    {/* </div>{" "} */}
                  </div>
                  <div className="ws-summary-line ws-summary-line--sum">
                    <div className="ws-summary-line__main">
                      <div className="ws-summary-line__header">
                        <span className="ws-summary-line__title ws-summary-line__title--is-bold">
                          Total sum{" "}
                        </span>
                      </div>{" "}
                      <span className="ws-summary-line__price ws-summary-line__price--is-bold">
                        {total}&nbsp;kr
                      </span>
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="ws-cart-footer ws-cart__footer">
                <div className="ws-cart-footer__buttons">
                  <strong className="ws-cart-footer__total">
                    Total sum {total}&nbsp;kr
                  </strong>
                  <button
                    className="ngr-button ws-cart-footer__checkout-button"
                    type="button"
                  >
                    <span className="ngr-button__text">To checkout</span>
                    <span className="ngr-button__icon ngr-button__icon--right">
                      <span
                        className="ngr-icon ngr-icon--ngr-chevron-right"
                        role="presentation"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="ngr-icon__svg"
                          height="24px"
                          width="24px"
                        >
                          <use href="/" xlinkHref="/"></use>
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        role="button"
        type="button"
        className="topmenu__button menu-button menu-button--primary hidden-desktop"
        title="Ãpne menyen"
      >
        <span className="visuallyhidden">Ã…pne eller lukke hovedmenyen</span>

        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns=""
        ></svg>
      </button>
    </>
  );
}
