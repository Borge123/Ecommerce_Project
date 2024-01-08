import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/context/cart";
import { updateBillingInfo } from "../services/updateBillingInfo";
export function CheckoutForm() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const cart = useCart();
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const schema = yup.object().shape({
    address: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    city: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    zip: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),

    house_number: yup
      .string()
      .max(20, "Must be 10 characters or less")
      .required("Required"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        address: "testaddrr",
        city: "react city",
        zip: "12424",
        house_number: "10",
      }}
      validateOnChange={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const updateBilling = updateBillingInfo(values);
        updateBilling.then((status) => {
          if (status === 200) {
            navigate("/checkout/payment");
          }
          return;
        });

        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isValid,
        isSubmitting,
      }) => (
        <Container style={{ maxWidth: "960px" }}>
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg"
              alt=""
              width="72"
              height="72"
            />
            <h2>Checkout form</h2>
            <p className="lead">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>
          <Row
            xs={1}
            md={2}
            l={3}
            xxl={2}
            className="g-4 justify-content-md-center "
          >
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul className="list-group mb-3 sticky-top">
                {cart.length > 0
                  ? cart?.map((cartItem) => {
                      return (
                        <li
                          key={cartItem.sku}
                          className="list-group-item d-flex justify-content-between lh-condensed"
                        >
                          <div>
                            <h6 className="my-0">{cartItem.name}</h6>

                            <div>
                              <small className="text-muted">
                                x{cartItem.quantity}
                              </small>
                            </div>
                          </div>
                          <span className="text-muted">${cartItem.price}</span>
                        </li>
                      );
                    })
                  : ""}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${total}</strong>
                </li>
              </ul>
            </div>
            <Col className="col-md-8 order-md-1">
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur("address")}
                    isValid={touched.address && !errors.address}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <Form.Label>city</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur("city")}
                    isValid={touched.city && !errors.city}
                    isInvalid={!!errors.city}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="validationFormik03">
                  <Form.Label>zip</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    onBlur={handleBlur("zip")}
                    isValid={touched.zip && !errors.zip}
                    isInvalid={!!errors.zip}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-3" controlId="validationFormik04">
                  <Form.Label>house number</Form.Label>
                  <Form.Control
                    type="text"
                    name="house_number"
                    value={values.house_number}
                    onChange={handleChange}
                    onBlur={handleBlur("house_number")}
                    isValid={touched.house_number && !errors.house_number}
                    isInvalid={!!errors.house_number}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.house_number}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">
                  {" "}
                  {isSubmitting ? "Continuing to payment..." : "Continue"}{" "}
                </Button>
              </Form>
            </Col>
          </Row>
          <hr className="mb-4" />
          {/* <h4 className="mb-3">Payment</h4>
          <div className="d-block my-3">
            <div className="custom-control custom-radio">
              <input
                id="credit"
                name="paymentMethod"
                type="radio"
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="credit">
                Credit card
              </label>
            </div>
            <div className="custom-control custom-radio">
              <input
                id="debit"
                name="paymentMethod"
                type="radio"
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="debit">
                Debit card
              </label>
            </div>
            <div className="custom-control custom-radio">
              <input
                id="paypal"
                name="paymentMethod"
                type="radio"
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="paypal">
                PayPal
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cc-name">Name on card</label>
              <input
                type="text"
                className="form-control"
                id="cc-name"
                placeholder=""
              />
              <small className="text-muted">
                Full name as displayed on card
              </small>
              <div className="invalid-feedback"> Name on card is required </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cc-number">Credit card number</label>
              <input
                type="text"
                className="form-control"
                id="cc-number"
                placeholder=""
              />
              <div className="invalid-feedback">
                {" "}
                Credit card number is required{" "}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">Expiration</label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder=""
              />
              <div className="invalid-feedback"> Expiration date required </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-cvv">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cc-cvv"
                placeholder=""
              />
              <div className="invalid-feedback"> Security code required </div>
            </div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Continue to checkout
          </button> */}
        </Container>
      )}
    </Formik>
  );
}
