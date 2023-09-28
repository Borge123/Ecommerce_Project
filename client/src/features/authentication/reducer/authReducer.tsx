export default function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      return {
        status: action.status,
        user: action.user,
        error: action.error,
      };
    }

    case "logout": {
      return {
        status: null,
        user: null,
        error: null,
      };
    }
    case "setuser": {
      return {
        status: action.status,
        user: action.user,
        error: action.error,
      };
    }
    default:
      return authState;
  }
}
