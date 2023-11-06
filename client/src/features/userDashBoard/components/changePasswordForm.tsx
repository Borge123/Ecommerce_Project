import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { ChangePassword } from "../services/changePassword";
import { useUser } from "../../authentication/context/AuthContext";
export default function ChangePasswordForm() {
  const { Formik } = formik;
  const authState = useUser();
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const pw = "1Test123";
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Required"),
    newPassword: yup
      .string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Required"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        oldPassword: "",
        newPassword: "",
        id: authState.user.userId,
      }}
      validateOnChange={true}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);

        const response = await ChangePassword(values);

        setSubmitting(false);
        resetForm();
        if (response === 200) {
          console.log("200");
          setStatus("200");
        }
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
            className=" g-4 justify-content-md-center "
          >
            <Col className="m-auto">
              <h1>Change password</h1>
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
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur("newPassword")}
                    isValid={touched.newPassword && !errors.newPassword}
                    isInvalid={!!errors.newPassword}
                    placeholder="new password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newPassword}
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
