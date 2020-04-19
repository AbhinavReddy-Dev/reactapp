import React, { useState } from "react";
import "./LoginSignup.css";
import { AddUserQuery, LoginQuery } from "../../Queries/queries";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/react-hooks";

export const LoginSignup = () => {
  // dispatch to make calls to Reducers to update the state of the store
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Login or Signup check Boolean
  const [loginToggle, setloginToggle] = useState(true);

  // Using useQuery from apollo/react-hooks to get the data from mongodb through server side GraphQL
  const signup = useMutation(AddUserQuery);
  const login = useQuery(LoginQuery);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginToggle) {
      console.log(email, password);
      const userLogin = await login({
        variables: {
          email: email,
          password: password,
        },
      });
      console.log("login", userLogin.data);

      dispatch({
        type: "LOGIN/SIGNUP",
        payload: userLogin.data.login,
      });
    }
    if (!loginToggle) {
      const userSignup = await signup({
        variables: {
          name,
          email,
          password,
          phone,
        },
      });
      console.log("signup", userSignup.data);

      dispatch({
        type: "LOGIN/SIGNUP",
        payload: userSignup.data.login,
      });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="todo">
      <h1>Login/ Signup</h1>

      {/* Below ternary is mandatory to render the Login or Signup component */}
      {loginToggle ? (
        <div>
          <form className="todo-add" onSubmit={handleLogin}>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="input-button" type="submit">
              Login
            </button>
            <button
              className="link-button"
              onClick={() => setloginToggle(false)}
            >
              Signup here!
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form className="todo-add" onSubmit={handleLogin}>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="text"
              className="input"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
            <button className="input-button" type="submit">
              Sign up
            </button>
            <button
              className="link-button"
              href=""
              onClick={() => setloginToggle(true)}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
