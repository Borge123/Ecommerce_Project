import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { createImageSrc } from "../helpers/createImageSrc";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useCartDispatch, useCart } from "../../cart/context/cart";
import "../../cart/styles/cart.css";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
//const productImages = import.meta.glob("../assets/images/*");
function findImage(images, imageName) {
  const endIndex = imageName.indexOf("laptop1.jpg");
  const image = images.find((el) => el === imageName);
  return image;
}
export default function Product({ product, onShow }) {
  //const images = Object.keys(productImages);
  // let result = findImage(images, "laptop1.jpg");
  // console.log(result);

  // console.log(images);
  const { setItem, getItem } = useLocalStorage();
  const dispatch = useCartDispatch();
  const cart = useCart();
  // //TODO set up context to update cart state
  // const cart = getItem("cart");

  return (
    <Card>
      <Link to={`/products/${product._id}`}>
        <Card.Img
          onClick={onShow}
          variant="top"
          src={createImageSrc(product.item.img_url)}
          alt={product.item.img_url}
        />
      </Link>
      <Card.Body>
        <Card.Title>{product.item.name}</Card.Title>

        <Card.Text>{product.item.description}</Card.Text>

        <>
          {!cart?.find((item) => item._id === product._id) ? (
            <Button
              onClick={() => {
                //TODO feature for the future add options to choose different versions of a product like color etc
                dispatch({
                  type: "add",
                  item: {
                    quantity: 0,
                    _id: product._id,
                    name: product.item.name,
                    src: product.item.img_url,
                    description: product.item.description,
                    price: product.skus[0].price, //hardcoded in a specific sku for now
                  },
                });
              }}
              variant="primary"
            >
              Add to cart
            </Button>
          ) : (
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
                        {cart.find((item) => item._id === product._id).quantity}
                      </span>
                    </span>
                  </span>

                  <button
                    className="ws-add-to-cart__button ws-add-to-cart__button--remove"
                    type="button"
                    title="Fjern fra handlevognen"
                    aria-label="Fjern Pytt i Panne fra handlevognen"
                    onClick={() => {
                      const cartItem = cart.find(
                        (item) => item._id === product._id
                      );
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
          )}
        </>
      </Card.Body>
    </Card>
  );
}
