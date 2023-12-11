import { useLoaderData } from "react-router-dom";
import { useCartDispatch, useCart } from "../../cart/context/cart";
import { createImageSrc } from "../helpers/createImageSrc";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "../../cart/styles/cart.css";
export function ProductDetails() {
  const { product } = useLoaderData();
  const dispatch = useCartDispatch();
  const cart = useCart();
  const [sku, setSku] = useState(product.skus[0].options.color);
  const currentSku = product.skus.find((el) => el.options.color === sku);
  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                {/* <Link to={`/products/${product._id}`} className="rounded-4"> */}
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100vh",
                    margin: "auto",
                  }}
                  className="rounded-4 fit"
                  src={createImageSrc(product.item.img_url)}
                  alt={product.item.img_url}
                />
                {/* </Link> */}
              </div>
              <div className="d-flex justify-content-center mb-3">
                {/* <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp">
            <img width="60" height="60" class="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp">
          </a>
          <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp">
            <img width="60" height="60" class="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp">
          </a>
          <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp">
            <img width="60" height="60" class="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp">
          </a>
          <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp">
            <img width="60" height="60" class="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp">
          </a>
          <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
            <img width="60" height="60" class="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
          </a> */}
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {product.item.name} <br />
                  Placeholder...
                </h4>
                <div className="d-flex flex-row my-3">
                  <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <span className="ms-1">4.5</span>
                  </div>
                  <span className="text-muted">
                    <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                    {currentSku.stock_quantity} items
                  </span>
                  <span className="text-success ms-2">In stock</span>
                </div>

                <div className="mb-3">
                  <span className="h5">${currentSku.price} </span>
                  <span className="text-muted">/per item</span>
                </div>

                <p>
                  Modern look and quality demo item is a streetwear-inspired
                  collection that continues to break away from the conventions
                  of mainstream fashion. Made in Italy, these black and brown
                  clothing low-top shirts for men.
                </p>

                <div className="row">
                  <dt className="col-3">Type:</dt>
                  <dd className="col-9">Regular</dd>

                  <dt className="col-3">Color</dt>
                  <dd className="col-9">Brown</dd>

                  <dt className="col-3">Material</dt>
                  <dd className="col-9">Cotton, Jeans</dd>

                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">Reebook</dd>
                </div>

                <hr />

                <div className="row mb-4">
                  <div className="col-md-4 col-6">
                    <label className="mb-2">Color</label>
                    <>
                      {product.skus.length >= 1 ? (
                        <select
                          className="form-select border border-secondary"
                          style={{ height: "35px" }}
                          onChange={(e) => {
                            setSku(e.target.value);
                          }}
                        >
                          {product.skus.map((type) => (
                            <option key={type._id}>{type.options.color}</option>
                          ))}
                        </select>
                      ) : (
                        ""
                      )}
                    </>
                  </div>

                  <div className="col-md-4 col-6 mt-2">
                    <div
                      className="input-group mt-4 "
                      style={{ width: "250px", height: "35px" }}
                    >
                      {!cart?.find(
                        (item) =>
                          item._id === product._id &&
                          item.sku === currentSku.sku
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
                        >
                          {" "}
                          Add to cart{" "}
                        </Button>
                      ) : (
                        <>
                          <div
                            className="ws-product-vertical__add"
                            style={{ borderBottom: "0px" }}
                          >
                            <div className="ws-product__quantity-picker">
                              <div className="ws-add-to-cart ws-add-to-cart--biggest">
                                <div className="ws-add-to-cart__quantity-stepper">
                                  <span className="ws-add-to-cart__quantity ws-add-to-cart__quantity--withselect">
                                    <span className="ws-quantity-picker">
                                      <span
                                        className="ws-quantity-picker__value ws-quantity-picker__value--no-unit"
                                        aria-hidden="true"
                                      >
                                        {
                                          cart.find(
                                            (item) =>
                                              item.sku === currentSku.sku
                                          ).quantity
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
                    </div>
                  </div>
                </div>
                {/* <a href="#" className="btn btn-warning shadow-0">
                  {" "}
                  Buy now{" "}
                </a>
                <a href="#" className="btn btn-primary shadow-0">
                  {" "}
                  <i className="me-1 fa fa-shopping-basket"></i> Add to cart{" "}
                </a>
                <a
                  href="#"
                  className="btn btn-light border border-secondary py-2 icon-hover px-3"
                >
                  {" "}
                  <i className="me-1 fa fa-heart fa-lg"></i> Save{" "}
                </a> */}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
