import { Link } from "react-router-dom";
import { createImageSrc } from "../../products/helpers/createImageSrc";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
export function CartItem({ cartItem, onShow, dispatch }) {
  console.log(cartItem);

  return (
    <li className="ws-cart-items__item">
      <div className="ws-product">
        <div className="ws-product__wrapper">
          <div className="ws-product__wrapper-inner">
            <div className="ws-product__sidebar">
              <div className="ws-product__image" aria-hidden="true">
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
                  <Link to={`/products/${cartItem._id}`}>
                    <img
                      onClick={onShow}
                      width="84"
                      height="84"
                      src={createImageSrc(cartItem.src)}
                      alt={cartItem.src}
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="ws-product__text-content">
              <a className="ws-product__title ws-hyphens-hack" href="/">
                {cartItem.name}
              </a>
              <div className="ws-product__subtitle">
                {cartItem.options.color}
              </div>
              <div className="ws-product__subtitle">{cartItem.description}</div>
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
                          title="Endre mengde"
                          aria-label="1 stk, endre mengde"
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
                            sku: cartItem.sku,
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
                            description: cartItem.description,
                            price: cartItem.price,
                            sku: cartItem.sku,
                            options: {
                              size: cartItem.options.size,
                              color: cartItem.options.color,
                              src: cartItem.options.src,
                            },
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
                {cartItem.price * cartItem.quantity} kr
              </strong>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
