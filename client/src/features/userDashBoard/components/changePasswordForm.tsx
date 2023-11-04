import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { ChangePassword } from "../services/changePassword";
export default function ChangePasswordForm() {
  const { Formik } = formik;
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Required"),
    password: yup
      .string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Required"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        oldPassword: "",
        password: "",
      }}
      validateOnChange={true}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);
        const response = await ChangePassword(values);

        if (response === 200) {
          setStatus("200");
        }

        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        values,
        touched,
        errors,
        status,
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
              <h1>Personal info</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Old password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur("oldPassword")}
                    isValid={touched.oldPassword && !errors.oldPassword}
                    isInvalid={!!errors.oldPassword}
                    placeholder="Old password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.oldPassword}
                  </Form.Control.Feedback>
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
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Form>
              {status === "200" ? <p>Success</p> : <p></p>}
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}
