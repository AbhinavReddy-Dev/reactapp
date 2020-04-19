import { InitialStateLogin } from "../index";

export default (state = InitialStateLogin, action) => {
  // console.log("from l red initialstate", InitialStateLogin);
  // Switch cases for each type of dispatch with payload in action object to update the state of the store
  switch (action.type) {
    case "LOGIN/SIGNUP":
      return {
        ...state,
        loginToken: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
