import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createImageSrc } from "../helpers/createImageSrc";
import { useLoaderData } from "react-router-dom";

export default function ProductModal(props) {
  const { product } = useLoaderData();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title as={"h2"} id="contained-modal-title-vcenter">
          {product.item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{product.item.description}</p>
        <img
          className="img-fluid"
          src={createImageSrc(product.item.img_url)}
          alt={product.item.img_url}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
