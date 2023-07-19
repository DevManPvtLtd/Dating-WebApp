import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
// import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { clearmessage } from "./redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const userdata = useSelector((state) => state.user);
  // console.log(user?.user);
  const user = userdata?.user;
  console.log(userdata);

  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            user?.accessToken !== undefined ? (
              <Home />
            ) : (
              <Navigate to={"/login"} replace={true} />
            )
          }
        />
        <Route
          path="login"
          element={
            user?.accessToken === undefined ? (
              <Login />
            ) : (
              <Navigate to={"/"} replace={true} />
            )
          }
        />
        <Route
          path="signup"
          element={
            user?.accessToken === undefined ? (
              <SignUp />
            ) : (
              <Navigate to={"/"} replace={true} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
