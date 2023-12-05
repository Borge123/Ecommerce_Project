export default function CartReducer(cart, action) {
  switch (action.type) {
    case "add": {
      //expects a product object
      let isItemInCart;
      if (cart.length) {
        isItemInCart = cart.find(
          (cartItem) =>
            cartItem._id === action.item._id && cartItem.sku === action.item.sku
        );
      }

      if (isItemInCart) {
        return cart.map((cartItem) =>
          cartItem.sku === action.item.sku
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...cart, { ...action.item, quantity: 1 }];
      }
    }
    case "remove": {
      //expect a product object
      let isItemInCart;
      if (cart.length > 0) {
        isItemInCart = cart.find(
          (cartItem) =>
            cartItem._id === action.item._id && cartItem.sku === action.item.sku
        );
        if (isItemInCart.quantity === 1) {
          return cart.filter((cartItem) => cartItem.sku !== action.item.sku);
        } else {
          return cart.map((cartItem) =>
            cartItem.sku === action.item.sku
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
      }
    }

    // case "update": {
    //   return cart.reduce(
    //     (total, item) => total + item.price * item.quantity,
    //     0
    //   );
    // }

    case "load": {
      //console.log(action.cart);

      return [...action.cart];
    }

    case "clear": {
      return [];
    }

    default:
      return cart;
  }
}
