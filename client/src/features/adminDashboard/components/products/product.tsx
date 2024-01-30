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
        {/* <div className="row">
          <div className="col">
            <p>{product.name}</p>
          </div>
          <div className="col">
            <p>{product.description}</p>
          </div>
          <div className="col">
            <img
              style={{
                height: "60px",
                width: "60px",
              }}
              className="img-fluid"
              src={createImageSrc(product.img_url)}
            ></img>
          </div>
          <div className="col">
            <Button
              onClick={(e) => {
                //TODO navigate to admindashboard/users/id
                console.log(_id);
                navigate(`/admindashboard/products/${_id}/edit`);
              }}
            >
              Edit
            </Button>
          </div>
        </div> */}
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
                      src={createImageSrc(
                        currentSku
                          ? currentSku.options.img_url
                          : product.img_url
                      )}
                      alt={product.img_url}
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
                            //TODO navigate to admindashboard/users/id
                            console.log(_id);
                            navigate(`/admindashboard/products/${_id}/edit`);
                          }}
                        >
                          Edit
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
