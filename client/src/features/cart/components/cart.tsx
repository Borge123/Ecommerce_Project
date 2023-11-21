import "../styles/cart.css";
import { FaXmark } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useCartDispatch, useCart } from "../context/cart";
export function Cart() {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const [cartState, setCartState] = useState("closed");
  //TODO count from localstorage number of items in cart and set cart to closed if 0 items
  const itemsInCart = cart?.length;
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
            <div className="ws-cart-button__total ws-cart-button__total--has-total">
              50 nok
            </div>
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
                    <ul className="ws-cart-items__list">
                      {cart.length > 0
                        ? cart?.map((cartItem) => {
                            return (
                              <li
                                key={cartItem._id}
                                className="ws-cart-items__item"
                              >
                                <div className="ws-product">
                                  <div className="ws-product__wrapper">
                                    <div className="ws-product__wrapper-inner">
                                      <div className="ws-product__sidebar">
                                        <a
                                          className="ws-product__image"
                                          aria-hidden="true"
                                          href="/"
                                        >
                                          <span
                                            className="ngr-icon ngr-icon--rebate"
                                            role="presentation"
                                            aria-hidden="true"
                                          >
                                            <svg
                                              viewBox="0 0 54 54"
                                              className="ngr-icon__svg"
                                              height="24px"
                                              width="24px"
                                            >
                                              <use href="/"></use>
                                            </svg>
                                          </span>
                                          <div className="ws-image--common-image-service ws-image ws-image--loaded">
                                            <img
                                              width="84"
                                              height="84"
                                              src="/"
                                              alt="Pytt i Panne Original 540g Findus"
                                              loading="lazy"
                                            />
                                          </div>
                                        </a>
                                      </div>
                                      <div className="ws-product__text-content">
                                        <a
                                          className="ws-product__title ws-hyphens-hack"
                                          href="/"
                                        >
                                          {cartItem.name}
                                        </a>
                                        <div className="ws-product__subtitle">
                                          {cartItem.description}
                                        </div>
                                        <div className="ws-product__price">
                                          <div className="ws-price">
                                            {" "}
                                            <span className="">
                                              {/* <span
                                            className="ws-price__original"
                                            aria-label="Før 62,90 kroner. "
                                          >
                                            Før 62,90&nbsp;kr
                                          </span>{" "} */}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ws-product__additional-info"></div>
                                      </div>
                                      <div className="ws-product__quantity-content">
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
                                                    <option value="0">
                                                      Fjern
                                                    </option>
                                                    <option value="1">
                                                      1 stk
                                                    </option>
                                                    <option value="10">
                                                      10 stk
                                                    </option>
                                                    <option value="20">
                                                      20 stk
                                                    </option>
                                                    <option value="30">
                                                      30 stk
                                                    </option>
                                                    <option value="40">
                                                      40 stk
                                                    </option>
                                                    <option value="50">
                                                      50 stk
                                                    </option>
                                                    <option value="60">
                                                      60 stk
                                                    </option>
                                                    <option value="70">
                                                      70 stk
                                                    </option>
                                                    <option value="80">
                                                      80 stk
                                                    </option>
                                                    <option value="90">
                                                      90 stk
                                                    </option>
                                                    <option value="100">
                                                      100 stk
                                                    </option>
                                                  </select>
                                                  <span
                                                    className="ws-quantity-picker__value ws-quantity-picker__value--no-unit"
                                                    aria-hidden="true"
                                                  >
                                                    {cartItem.quantity}
                                                  </span>
                                                </span>
                                              </span>
                                              <button
                                                className="ws-add-to-cart__button ws-add-to-cart__button--remove"
                                                type="button"
                                                title="Fjern fra handlevognen"
                                                aria-label="Fjern Pytt i Panne fra handlevognen"
                                                onClick={() => {
                                                  dispatch({
                                                    type: "remove",
                                                    item: {
                                                      _id: cartItem._id,
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
                                                      quantity: 0,
                                                      _id: cartItem._id,
                                                      name: cartItem.name,
                                                      src: cartItem.src,
                                                      description:
                                                        cartItem.description,
                                                      price: cartItem.price,
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
                                        <strong className="ws-product__line-price ws-product__line-price--discounted">
                                          {cartItem.price * cartItem.quantity}
                                        </strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        : ""}
                    </ul>
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
                        44,90
                      </span>
                    </div>{" "}
                  </div>
                  <div className="ws-summary-line ws-summary-line--handover-product">
                    <div className="ws-summary-line__main">
                      <div className="ws-summary-line__header">
                        <span className="ws-summary-line__title">Plukk </span>
                      </div>{" "}
                      <span className="ws-summary-line__price">49,00</span>
                    </div>{" "}
                  </div>
                  <div className="ws-summary-line ws-summary-line--sum">
                    <div className="ws-summary-line__main">
                      <div className="ws-summary-line__header">
                        <span className="ws-summary-line__title ws-summary-line__title--is-bold">
                          Totalsum{" "}
                        </span>
                      </div>{" "}
                      <span className="ws-summary-line__price ws-summary-line__price--is-bold">
                        {total};
                      </span>
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="ws-cart-footer ws-cart__footer">
                <div className="ws-cart-footer__buttons">
                  <strong className="ws-cart-footer__total">
                    Totalsum {total}&nbsp;kr
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
