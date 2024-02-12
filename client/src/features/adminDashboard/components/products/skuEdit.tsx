import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Form as RouterForm } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SkuEdit() {
  const { Formik } = formik;
  const { currSku } = useLoaderData();
  console.log(currSku);

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
          newsku: "",
          price: "",
          stock_quantity: "",
          options: {
            size: "",
            color: "",
            img_url: "",
          },
        }}
        validateOnChange={true}
        onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
          setSubmitting(true);
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
                <h1>Edit sku</h1>
                {/* <Form noValidate onSubmit={handleSubmit}> */}
                <RouterForm method="put">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New sku</Form.Label>
                    <Form.Control
                      type="text"
                      name="newsku"
                      value={values.newsku}
                      onChange={handleChange}
                      onBlur={handleBlur("newsku")}
                      isValid={touched.newsku && !errors.newsku}
                      isInvalid={!!errors.newsku}
                      placeholder={currSku.sku}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newsku}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur("price")}
                      isValid={touched.price && !errors.price}
                      isInvalid={!!errors.price}
                      placeholder={currSku.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Stock quantity</Form.Label>
                    <Form.Control
                      type="text"
                      name="stock_quantity"
                      value={values.stock_quantity}
                      onChange={handleChange}
                      onBlur={handleBlur("stock_quantity")}
                      isValid={touched.stock_quantity && !errors.stock_quantity}
                      isInvalid={!!errors.stock_quantity}
                      placeholder={currSku.stock_quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.stock_quantity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      type="text"
                      name="options.size"
                      value={values.options?.size}
                      onChange={handleChange}
                      onBlur={handleBlur("options.size")}
                      isValid={touched.options?.size && !errors.options?.size}
                      isInvalid={!!errors.options?.size}
                      placeholder={currSku.options.size}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.options?.size}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Color</Form.Label>
                    <Form.Control
                      type="text"
                      name="options.color"
                      value={values.options?.color}
                      onChange={handleChange}
                      onBlur={handleBlur("options.color")}
                      isValid={touched.options?.color && !errors.options?.color}
                      isInvalid={!!errors.options?.color}
                      placeholder={currSku.options.color}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.options?.color}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Img URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="options.img_url"
                      value={values.options?.img_url}
                      onChange={handleChange}
                      onBlur={handleBlur("options.img_url")}
                      isValid={
                        touched.options?.img_url && !errors.options?.img_url
                      }
                      isInvalid={!!errors.options?.img_url}
                      placeholder={currSku.options.img_url}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.options?.img_url}
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
