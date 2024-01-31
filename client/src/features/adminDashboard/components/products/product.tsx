import { useLoaderData } from "react-router-dom";
import { createImageSrc } from "../../../products/helpers/createImageSrc";
import { Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function Product() {
  const { product } = useLoaderData();
  const navigate = useNavigate();
  const [sku, setSku] = useState(product.skus[0].options.color);
  const currentSku = product.skus.find((el) => el.options.color === sku);

  return (
    <>
      <Col>
        <div>
          <section className="py-5">
            <div className="container">
              <div className="row gx-5">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <img
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100vh",
                        margin: "auto",
                      }}
                      className="rounded-4 fit"
                      src={createImageSrc(
                        currentSku
                          ? currentSku.options.img_url
                          : product.img_url
                      )}
                      alt={product.img_url}
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3"></div>
                </aside>
                <main className="col-lg-6">
                  <div className="ps-lg-3">
                    <h4 className="title text-dark">
                      {product.name} <br />
                    </h4>
                    <div className="d-flex flex-row my-3">
                      <span className="text-muted">
                        {currentSku.stock_quantity} items
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>

                    <div className="mb-3">
                      <span className="h5">${currentSku.price} </span>
                      <span className="text-muted">/per item</span>
                    </div>

                    <p>{product.description}</p>

                    <div className="row">
                      <h6>Options:</h6>
                      <dt className="col-3">Size:</dt>
                      <dd className="col-9">{currentSku.options.size}</dd>

                      <dt className="col-3">Color</dt>
                      <dd className="col-9">{currentSku.options.color}</dd>

                      <dt className="col-3">Image name</dt>
                      <dd className="col-9">{currentSku.options.img_url}</dd>
                    </div>

                    <hr />

                    <div className="row">
                      <dt className="col-3">Category:</dt>
                      <dd className="col-9">{product.category}</dd>

                      <dt className="col-3">Sub category</dt>
                      <dd className="col-9">{product.subcategory}</dd>
                    </div>

                    <hr />

                    <div className="row mb-4">
                      <div className="col-md-4 col-6">
                        <label className="mb-2">
                          Pick sku based on the color
                        </label>
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
                                <option key={type._id}>
                                  {type.options.color}
                                </option>
                              ))}
                            </select>
                          ) : (
                            ""
                          )}
                        </>
                      </div>
                      <div
                        className="col-md-4 col-6"
                        style={{
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        <Button
                          onClick={(e) => {
                            navigate(
                              `/admindashboard/products/${product._id}/edit`
                            );
                          }}
                        >
                          Edit Product
                        </Button>
                      </div>
                      <div
                        className="col-md-4 col-6"
                        style={{
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        <Button
                          onClick={(e) => {
                            navigate(
                              `/admindashboard/products/${product._id}/${currentSku.sku}/edit`
                            );
                          }}
                        >
                          Edit Sku
                        </Button>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </section>
        </div>
      </Col>
    </>
  );
}
