import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { UpdateUserInfo } from "../services/updateUserInfo";
import { useUserDispatch } from "../../authentication/context/AuthContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
export default function UserInfoForm({ userInfo }) {
  const { Formik } = formik;

  const dispatch = useUserDispatch();
  const { setItem, getItem } = useLocalStorage();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
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
        id: userInfo._id,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      }}
      validateOnChange={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        alert(JSON.stringify(values, null, 2));
        await UpdateUserInfo(values);
        const user = {
          userId: userInfo._id,
          firstName: values.firstName,
        };
        const token = sessionStorage.getItem("jwtToken");
        dispatch({
          type: "updateUser",
          status: "success",
          user: user,
          token: token,
          error: null,
        });
        //resetForm();
        setSubmitting(false);

        //TODO update ui after userdata has been updated
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
                    placeholder={values.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur("firstName")}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                    placeholder={values.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur("lastName")}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                    placeholder={values.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}
