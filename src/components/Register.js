import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { registerSubmit } from "../api";

const Register = (props) => {
  const { setIsLoggedIn } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="register" onSubmit={(event) => event.preventDefault()}>
      <h1>Register:</h1>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder=""
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder=""
      />
      <button
        onClick={async (event) => {
          event.preventDefault();
          try {
            let submit = await registerSubmit(username, password);

            if (submit.error) {
              alert("There was an error registering...");
            } else {
              return <Redirect to="/" />;
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
