import { CartItem } from "./cartitem";
import { UseGetFetchQuery } from "../../products/hooks/useGetFetchQuery";
export function CartItems({ cart, dispatch, modalDispatch }) {
  const products = UseGetFetchQuery("products");

  return (
    <>
      <ul className="ws-cart-items__list">
        {cart.length > 0
          ? cart?.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem.sku}
                  cartItem={cartItem}
                  dispatch={dispatch}
                  onShow={() =>
                    modalDispatch({
                      type: "open",
                      product: products.find((el) => el._id === cartItem._id),
                    })
                  }
                />
              );
            })
          : ""}
      </ul>
    </>
  );
}
