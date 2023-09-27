export default function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      return {
        authState: {
          status: action.status,
          user: action.user,
          error: action.error,
        },
      };
    }

    case "logout": {
      return {
        authState: {
          status: null,
          user: null,
          error: null,
        },
      };
    }
    default:
      return authState;
  }
}
