import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/context/cart";
import { createOrder } from "../services/createOrder";
export function PaymentForm() {
  const { Formik } = formik;
  const cart = useCart();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    credit_card_number: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),

    expiration: yup
      .string()
      .max(4, "Must be 4 characters or less")
      .required("Required"),

    cvv: yup
      .string()
      .max(3, "Must be 3 characters or less")
      .required("Required"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        name: "tom bor",
        credit_card_number: "1245345465789853443",
        expiration: "1406",
        cvv: "103",
      }}
      validateOnChange={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const order = createOrder(cart);
        order.then((status) => {
          //TODO dispatch to cart to empty it
          //change ui on success
          if (status === 200) {
            return <p>Order created</p>;
          }
          return <p>error</p>;
        });
        //const updateBilling = updateBillingInfo(values);
        // updateBilling.then((status) => {
        //   if (status === 200) {
        //   }
        //   return;
        // });

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
            <h2>Payment</h2>
            <p className="lead">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>

          <hr className="mb-4" />
          <h4 className="mb-3">Payment</h4>
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
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Form.Group
                className="col-md-6 mb-3"
                controlId="validationFormik01"
              >
                <Form.Label>Name on card</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur("name")}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="col-md-6 mb-3"
                controlId="validationFormik02"
              >
                <Form.Label>Credit card number</Form.Label>
                <Form.Control
                  type="text"
                  name="credit_card_number"
                  value={values.credit_card_number}
                  onChange={handleChange}
                  onBlur={handleBlur("credit_card_number")}
                  isValid={
                    touched.credit_card_number && !errors.credit_card_number
                  }
                  isInvalid={!!errors.credit_card_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.credit_card_number}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group
                  className="col-md-3 mb-3"
                  controlId="validationFormik03"
                >
                  <Form.Label>Expiration</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiration"
                    value={values.expiration}
                    onChange={handleChange}
                    onBlur={handleBlur("expiration")}
                    isValid={touched.expiration && !errors.expiration}
                    isInvalid={!!errors.expiration}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expiration}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="col-md-3 mb-3"
                  controlId="validationFormik04"
                >
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={values.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur("cvv")}
                    isValid={touched.cvv && !errors.cvv}
                    isInvalid={!!errors.cvv}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Row>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Create order
            </button>
          </Form>
        </Container>
      )}
    </Formik>
  );
}
