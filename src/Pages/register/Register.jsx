import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eror, setEror] = useState(false);
  const handleSubmit = async (e) => {
    setEror(false);
    e.preventDefault();
    try {
      const res = await axios.post("/auth/reg", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      console.log(error);
      setEror(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginBtn">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {eror && (
        <span style={{ color: "red", marginTop: "5 px" }}>
          Something is wrong with your Info
        </span>
      )}
    </div>
  );
}
