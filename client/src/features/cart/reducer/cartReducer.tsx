export default function cartReducer(cart, action) {
  switch (action.type) {
    case "add": {
      //expects a product object
      let isItemInCart;
      if (cart.length) {
        isItemInCart = cart.find(
          (cartItem) => cartItem._id === action.item._id
        );
      }

      if (isItemInCart) {
        return cart.map((cartItem) =>
          cartItem._id === action.item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...cart, { ...action.item, quantity: 1 }];
      }
    }
    case "remove": {
      //expect a product object
      const isItemInCart = cart.find(
        (cartItem) => cartItem._id === action.item._id
      );

      if (isItemInCart.quantity === 1) {
        return cart.filter((cartItem) => cartItem._id !== action.item._id);
      } else {
        return cart.map((cartItem) =>
          cartItem._id === action.item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    }

    case "update": {
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }

    case "load": {
      console.log(action.cart);
      return [...action.cart];
    }

    case "clear": {
      return [];
    }

    default:
      return cart;
  }
}
