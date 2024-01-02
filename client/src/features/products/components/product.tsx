import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { createImageSrc } from "../helpers/createImageSrc";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useCartDispatch, useCart } from "../../cart/context/cart";
import "../../cart/styles/cart.css";

import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
//const productImages = import.meta.glob("../assets/images/*");
// function findImage(images, imageName) {
//   const endIndex = imageName.indexOf("laptop1.jpg");
//   const image = images.find((el) => el === imageName);
//   return image;
// }

export default function Product({ product, onShow }) {
  //TODO: access sku data based on what sku is at
  const [sku, setSku] = useState(product.skus[0].options.color);
  const currentSku = product.skus.find((el) => el.options.color === sku);
  //console.log(useGetFetchQuery("products"));

  const dispatch = useCartDispatch();
  const cart = useCart();

  return (
    <Card>
      <Link to={`/products/${product._id}`}>
        <Card.Img
          onClick={onShow}
          variant="top"
          src={createImageSrc(product.item.img_url)}
          alt={product.item.img_url}
          loading="lazy"
        />
      </Link>
      <Card.Body>
        <Card.Title>{product.item.name}</Card.Title>
        {/* Todo: add a select list of different variants of a product if it has more then 1 */}
        <Card.Text>{product.item.description}</Card.Text>
        <Card.Text>{currentSku.price}</Card.Text>
        <>
          {product.skus.length > 1 ? (
            <Form.Select
              className="mb-4"
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

        <>
          {!cart?.find(
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
              <div className="ws-product-vertical__add">
                <div className="ws-product-vertical__price ws-product-vertical__price--discounted">
                  {currentSku.price} kr
                </div>
                <div className="ws-product__quantity-picker">
                  <div className="ws-add-to-cart ws-add-to-cart--small">
                    <div className="ws-add-to-cart__quantity-stepper">
                      <span className="ws-add-to-cart__quantity ws-add-to-cart__quantity--withselect">
                        <span className="ws-quantity-picker">
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
                          const cartItem = cart.find(
                            (item) => item._id === product._id
                          );
                          // if(cartItem.quantity === 1){

                          // }
                          dispatch({
                            type: "remove",
                            item: {
                              _id: product._id,
                              name: product.item.name,
                              src: product.item.img_url,
                              description: product.item.description,
                              sku: currentSku.sku,
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
              </div>
            </>
          )}
        </>
      </Card.Body>
    </Card>
  );
}
