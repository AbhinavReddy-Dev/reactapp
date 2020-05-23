import React, { useState } from "react";
import "./LoginSignup.css";
import { AddUserQuery } from "../../Queries/queries";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

export const Signup = () => {
  // dispatch to make calls to Reducers to update the state of the store
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Using useQuery from apollo/react-hooks to get the data from mongodb through server side GraphQL
  const [addUser] = useMutation(AddUserQuery);
  // console.log(addUser);

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = await addUser({
      variables: {
        name,
        email,
        password,
        phone,
      },
    });

    // console.log("signup", newUser);

    dispatch({
      type: "LOGIN_SIGNUP",
      payload: newUser.data.addUser,
    });

    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
  };

  return (
    <div>
      <form className="todo-add" onSubmit={handleSignup}>
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
      </form>
    </div>
  );
};
