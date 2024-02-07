import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Form as RouterForm } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import { useLoaderData } from "react-router-dom";
import { UpdateItem } from "../../services/products/updateItem";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../context/queryProvider";
export default function ProductEdit() {
  const { Formik } = formik;
  const { product } = useLoaderData();

  const navigate = useNavigate();

  const schema = yup.object().shape({
    _id: yup.string().required("Required"),
    name: yup.string().required("Required"),

    description: yup.string().required("Required"),

    img_url: yup.string().required("Required"),
  });
  // TODO try to add react router form
  return (
    <Col>
      <Formik
        validationSchema={schema}
        initialValues={{
          _id: product._id,
          name: "",
          description: "",
          img_url: "",
        }}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          setSubmitting(true);

          // const response = await UpdateItem(values);

          // setSubmitting(false);
          // resetForm();
          // if (response === 200) {
          //   setStatus("200");
          //   queryClient.refetchQueries({ queryKey: ["products"] });
          //   // queryClient.refetchQueries({ queryKey: ["product", product._id] });
          //   alert("Successfully updated item");
          //   console.log(queryClient.getQueryData(["product", product._id]));
          //   navigate(`/admindashboard/products/${product._id}`);
          // }
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
                <h1>Edit product</h1>
                {/* <Form noValidate onSubmit={handleSubmit}> */}
                <RouterForm method="put">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur("name")}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                      placeholder={product.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur("description")}
                      isValid={touched.description && !errors.description}
                      isInvalid={!!errors.description}
                      placeholder={product.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Img URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="img_url"
                      value={values.img_url}
                      onChange={handleChange}
                      onBlur={handleBlur("img_url")}
                      isValid={touched.img_url && !errors.img_url}
                      isInvalid={!!errors.img_url}
                      placeholder={product.img_url}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.img_url}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" disabled={isSubmitting}>
                    Save
                  </Button>
                </RouterForm>
                {/* </Form> */}
                {status === "200" ? <p>Success</p> : <p></p>}
              </Col>
            </Row>
          </Container>
        )}
      </Formik>
    </Col>
  );
}
