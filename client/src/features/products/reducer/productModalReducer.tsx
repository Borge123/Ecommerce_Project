export default function ProductModalReducer(modal, action) {
  switch (action.type) {
    case "open":
      return {
        status: true,
        product: action.product,
      };
    case "close": {
      return {
        status: false,
        product: action.product,
      };
    }
    default:
      return modal;
  }
}
