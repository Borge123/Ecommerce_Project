import { Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
export function Order() {
  const { order } = useLoaderData();
  return (
    <Col className="md-8">
      <h1>Order info</h1>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">ID</h6>
          </div>
          <div className="col-sm-9 text-secondary">{order._id}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">User id</h6>
          </div>
          <div className="col-sm-9 text-secondary"> {order.user_id}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Status</h6>
          </div>
          <div className="col-sm-9 text-secondary"> {order.status}</div>
        </div>
        <hr />
        {order.discount_id ? (
          <>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Discount</h6>
              </div>
              <div className="col-sm-9 text-secondary">{order.discount_id}</div>
            </div>
            <hr />
          </>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Total</h6>
          </div>

          <div className="col-sm-9 text-secondary">{order.total}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Items</h6>
          </div>

          <div className="col-sm-9 text-secondary">
            <ul className="" style={{ listStyle: "none" }}>
              {order.items.map((item) => {
                return (
                  <li key={item.sku}>
                    <>
                      <div className="row">
                        <div className="col">
                          <p>{item.sku}</p>
                        </div>
                        <div className="col">
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                      <hr />
                    </>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-sm-12">
            {" "}
            <a className="btn btn-info " target="__blank" href="">
              Edit
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </Col>
  );
}
