import React, { useState } from "react";
import "./LoginSignup.css";
import { Signup } from "./Signup";
import { Login } from "./Login";

export const LoginSignup = () => {
  // Login or Signup check Boolean
  const [loginToggle, setloginToggle] = useState(true);

  return (
    <div className="todo">
      <h1>{!loginToggle ? "Signup" : "Login"}</h1>

      {/* Below ternary is mandatory to render the Login or Signup component */}
      {loginToggle ? <Login /> : <Signup />}
      <button
        className="link-button"
        onClick={() => setloginToggle(!loginToggle)}
      >
        {loginToggle ? "Signup" : "Login"}
      </button>
    </div>
  );
};
