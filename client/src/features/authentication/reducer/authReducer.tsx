export default function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      return {
        status: action.status,
        user: action.user,
        error: action.error,
        token: action.token,
      };
    }

    case "logout": {
      return {
        status: null,
        user: null,
        error: null,
        token: null,
      };
    }
    case "setuser": {
      return {
        status: action.status,
        user: action.user,
        error: action.error,
        token: action.token,
      };
    }
    case "refreshtoken": {
      return {
        status: action.status,
        user: action.user,
        error: action.error,
        token: action.token,
      };
    }
    case "updateUser": {
      return {
        status: action.status,
        user: action.user,
        token: action.token,
        error: action.error,
      };
    }
    default:
      return authState;
  }
}
