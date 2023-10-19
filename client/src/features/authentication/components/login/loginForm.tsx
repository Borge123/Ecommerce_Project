import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import * as formik from "formik";
import * as yup from "yup";
import { Login, GetUserInfo } from "../../services/loginServices";
import { useUserDispatch } from "../../context/AuthContext";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const dispatch = useUserDispatch();
  const { Formik } = formik;
  const { setItem, getItem } = useLocalStorage();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: "react@test.com",
        password: "1Test123",
      }}
      validateOnChange={true}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        alert(JSON.stringify(values, null, 2));
        const loginRequest = Login(values);

        loginRequest.then((value) => {
          if (value === 200) {
            console.log(value);
            //TODO on login success redirect to home or a dashboard
            const token = sessionStorage.getItem("jwtToken");
            setTimeout(() => {
              const userData = GetUserInfo();
              console.log("fetching user data");
              userData.then((value) => {
                dispatch({
                  type: "login",
                  status: "success",
                  user: value,
                  token: token,
                  error: null,
                });

                setItem("user", JSON.stringify(value));
                navigate("/account");
              });
            }, 100);
          }
          resetForm();

          setSubmitting(false);
        });
      }}
    >
      {({
        handleSubmit,
        handleChange,
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
              <h1>Login</h1>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
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

                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}
