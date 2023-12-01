export default function ProductModalReducer(modal, action) {
  switch (action.type) {
    case "open": {
      return {
        modal: action.modal,
      };
    }
    case "close": {
      return {
        modal: action.modal,
      };
    }
    default:
      return modal;
  }
}
