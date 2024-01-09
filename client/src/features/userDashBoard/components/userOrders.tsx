import { useLoaderData } from "react-router-dom";
export function UserOrders() {
  const { orders } = useLoaderData();
  console.log(orders);

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
                  className="list-group-item d-flex justify-content-between lh-condensed"
                >
                  <div>
                    <h6 className="my-0">{order.user_id}</h6>
                    <small className="text-muted">{order.status}</small>

                    <div>
                      {order.items.map((item) => {
                        return (
                          <li
                            key={item.sku}
                            className="list-group-item d-flex justify-content-between lh-condensed"
                          >
                            <h4>{item.name}</h4>
                            <small className="text-muted">
                              {item.options.color}
                            </small>
                          </li>
                        );
                      })}
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
