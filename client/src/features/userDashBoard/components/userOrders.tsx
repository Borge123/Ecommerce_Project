import { useLoaderData } from "react-router-dom";
export function UserOrders() {
  const { orders } = useLoaderData();

  return (
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Orders </span>
        <span className="badge badge-secondary badge-pill">3</span>
      </h4>
      <ul className="list-group mb-3 sticky-top">
        {orders.length > 0
          ? orders?.map((order) => {
              return (
                <li
                  key={order._id}
                  className="list-group-item d-flex justify-content-between lh-condensed mb-2"
                >
                  <div>
                    <p className="">Order {order._id}</p>
                    <p>Created: {order.createdAt.slice(0, 10)}</p>
                    <p>
                      Status:{" "}
                      <small className="text-muted">{order.status}</small>{" "}
                    </p>

                    <div>
                      <ul className="list-group mb-3 sticky-top">
                        {order.items.map((item) => {
                          return (
                            <li
                              key={item.sku}
                              className="list-group-item d-flex justify-content-between lh-condensed"
                            >
                              <div>
                                <p>{item.name}</p>
                                <small className="text-muted">
                                  {item.options.color}
                                </small>
                              </div>
                              <div>
                                <small className="text-muted">
                                  x{item.quantity}
                                </small>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* <span className="text-muted">${cartItem.price}</span> */}
                  <h2>${order.total}</h2>
                </li>
              );
            })
          : ""}

        {/* <li className="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>${total}</strong>
        </li> */}
      </ul>
    </div>
  );
}
