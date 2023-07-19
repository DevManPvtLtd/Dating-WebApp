import React from "react";
import { InputField, CustomButton } from "../components";
import sp from "../assets/sp-heart.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userAction";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { clearmessage } from "../redux/actions/userAction";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const userdata = useSelector((state) => state.user);
  // console.log(user?.user);
  const user = userdata?.user;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPass") {
      setConfirmPass(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    toast(userdata?.message);
    clearmessage(dispatch);
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
        <div className="signup-label signup-heading">Log In</div>
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
        <div className="signup-button-container">
          <CustomButton
            onclick={handleSubmit}
            BodyClass="login-button-body"
            TextClass="login-text-body"
            text="log In"
          />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
        <div className="signup-prompt">
          <span>Don't Have An acoount?</span>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span
              style={{
                color: "blue",
                cursor: "pointer",
              }}>
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
