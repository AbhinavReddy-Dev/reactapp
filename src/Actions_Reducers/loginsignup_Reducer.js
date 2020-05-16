import { InitialStateLogin } from "../index";

export default (state = InitialStateLogin, action) => {
  // console.log("from l red initialstate", InitialStateLogin);
  // Switch cases for each type of dispatch with payload in action object to update the state of the store
  switch (action.type) {
    case "LOGIN_SIGNUP":
      localStorage.setItem("login", true);
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        token: localStorage.getItem("token"),
        userId: action.payload.id,
        sessionExpiration: action.payload.sessionExpiration,
      };
    case "LOGOUT":
      localStorage.setItem("login", false);
      localStorage.setItem("token", null);

      return {
        ...state,
        isLoggedin: false,
        token: null,
        userId: null,
        sessionExpiration: null,
      };
    default:
      return {
        ...state,
      };
  }
};
