import { Row } from "react-bootstrap";
import { useCart } from "../../cart/context/cart";
export function CartSummary() {
  const cart = useCart();
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  //TODO display cart items and total
  return (
    <div className="container">
      <Row
        xs={1}
        md={2}
        l={3}
        xxl={2}
        className="g-4 justify-content-md-center "
      >
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Cart summary</span>
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

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>
          <button className="btn btn-primary btn-lg btn-block">
            Continue to payment
          </button>
        </div>
      </Row>
    </div>
  );
}
