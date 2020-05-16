import { InitialStateLogin } from "../index";

export default (state = InitialStateLogin, action) => {
  // console.log("from l red initialstate", InitialStateLogin);
  // Switch cases for each type of dispatch with payload in action object to update the state of the store
  switch (action.type) {
    case "IS_LOGGEDIN":
      return {
        ...state,
        isLoggedin: action.payload,
      };
    case "LOGIN_SIGNUP":
      console.log(action);
      localStorage.setItem("login", true);

      localStorage.setItem("token", action.payload.token);
      console.log(localStorage.getItem("token"));
      // localStorage.setItem("token", action.payload.token);
      // console.log(localStorage.getItem("token"));

      return {
        ...state,
        token: localStorage.getItem("token"),
        userId: action.payload.id,
        sessionExpiration: action.payload.sessionExpiration,
      };
    case "LOGOUT":
      localStorage.setItem("login", false);
      localStorage.setItem("token", null);

      console.log(localStorage.getItem("login"));

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
