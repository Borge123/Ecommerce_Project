import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { createUser } from "../../services/signupServices";

export default function SignupForm() {
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
      }) => (
        <Container>
          <Row
            xs={1}
            md={2}
            l={3}
            xxl={2}
            className=" vh-100 g-4 justify-content-md-center "
          >
            <Col className="m-auto">
              <h1>Create user</h1>
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

                <Button type="submit">Signup</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}
