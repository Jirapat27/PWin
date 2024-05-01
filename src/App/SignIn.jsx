import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { withRouter } from 'react-router-dom'; // Import withRouter
import { auth } from "../Config";

const SignIn = ({ history }) => { // Pass history as a prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Successfully logged in:", userCredential.user.email);
        // Redirect to homepage upon successful login
        history.push("/home");
      })
      .catch((error) => {
        console.log("Error logging in:", error.message);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default withRouter(SignIn); // Wrap SignIn component with withRouter