import React from "react";
import { InputField, CustomButton } from "../components";
import sp from "../assets/sp-heart.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/userAction";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(dispatch, { email, password, name });
  };

  return (
    <div className="signup-container">
      <div className="icon-container">
        <img
          src={sp}
          alt="phone"
          height={800}
          width={400}
          className="icon-phone"
        />
      </div>
      <div className="details-container">
        <div className="signup-label signup-heading">Sign Up</div>
        <div className="text-container">
          <span className="signup-label">Email</span>
          <InputField
            onChange={handleChange}
            type="text"
            classes="login-input"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="text-container">
          <span className="signup-label">Password</span>
          <InputField
            onChange={handleChange}
            type="password"
            classes="login-input"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="text-container">
          <span className="signup-label">Name</span>
          <InputField
            onChange={handleChange}
            type="text"
            classes="login-input"
            name="name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="signup-button-container">
          <CustomButton
            onclick={handleSubmit}
            BodyClass="login-button-body"
            TextClass="login-text-body"
            text="Sign Up"
          />
        </div>
        <div className="signup-prompt">
          <span>Already Have An acoount?</span>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span style={{ color: "blue", cursor: "pointer" }}>Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
