import { Row } from "react-bootstrap";
import { useCart } from "../../cart/context/cart";
import { useNavigate } from "react-router-dom";
export function CartSummary() {
  const cart = useCart();
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
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
            {cart.length > 0
              ? cart?.map((cartItem) => {
                  return (
                    <li
                      key={cartItem.sku}
                      className="list-group-item d-flex justify-content-between lh-condensed"
                    >
                      <div>
                        <h6 className="my-0">{cartItem.name}</h6>
                        <small className="text-muted">
                          {cartItem.description}
                        </small>
                        <div>
                          <small className="text-muted">
                            x{cartItem.quantity}
                          </small>
                        </div>
                      </div>
                      <span className="text-muted">${cartItem.price}</span>
                    </li>
                  );
                })
              : ""}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${total}</strong>
            </li>
          </ul>
          <button
            onClick={() => navigate("/checkout/billinginfo")}
            className="btn btn-primary btn-lg btn-block"
          >
            Continue
          </button>
        </div>
      </Row>
    </div>
  );
}
