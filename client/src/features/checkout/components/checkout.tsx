import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { createUser } from "../../authentication/services/signupServices";

export default function Checkout() {
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup
      .string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Required"),
    firstName: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: yup
      .string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "react@test.com",
        password: "1Test123",
        firstName: "reacttester",
        lastName: "react",
      }}
      validateOnChange={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          createUser(values);
          resetForm();
          setSubmitting(false);
        }, 400);
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
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Second product</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Third item</h6>
                    <small className="text-muted">Brief description</small>
                  </div>
                  <span className="text-muted">$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">-$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$20</strong>
                </li>
              </ul>
            </div>
            <Col className="col-md-8 order-md-1">
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur("firstName")}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur("lastName")}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur("email")}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur("password")}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    placeholder="Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button type="submit">
                  {" "}
                  {isSubmitting ? "Creating user..." : "Create user"}{" "}
                </Button>
              </Form>
            </Col>
          </Row>
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
          </button>
        </Container>
      )}
    </Formik>
  );
}
