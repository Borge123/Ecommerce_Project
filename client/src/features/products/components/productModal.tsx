import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLoaderData } from "react-router-dom";

export default function ProductModal(props) {
  const { product } = useLoaderData();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
          {product._id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{product.item.name}</h4>
        <p>{product.item.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
