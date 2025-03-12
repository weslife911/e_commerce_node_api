import React from 'react';
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {  } from "react-jwt"

function Login() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    }, validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().min(8, "Must Contain 8 Characters").required("Password is required").matches( /^(?=.*[a-z])/, " Must Contain One Lowercase Character" ).matches( /^(?=.*[A-Z])/, " Must Contain One Uppercase Character" ).matches( /^(?=.*[0-9])/, " Must Contain One Number Character" ).matches( /^(?=.*[!@#\$%\^&\*])/, " Must Contain One Special Case Character" ),
    }), onSubmit: async(values) => {

      const url = "http://localhost:3000/auth/login";      
      const registerUser = await axios.post(url, values);

      if(registerUser.data.success && registerUser.data.token) {

        const token = registerUser.data.token;

        localStorage.setItem("token", token);
        navigate("/shop");
      } else {
        navigate("/login");
      }

    }
  });

  return (
    <>
      <div className="container">
        <input type="checkbox" id="check"/>
        <div className="login form">
          <header>Login</header>
          <form onSubmit={formik.handleSubmit}>
            <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder="Enter your email"/>
            <p>
              {formik.errors.email}
            </p>
            <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder="Enter your password"/>
            <p>
              {formik.errors.password}
            </p>
            <Link to="#">Forgot password?</Link>
            <input type="submit" className="button" value="Login"/>
          </form>
          <div className="signup">
            <span className="signup">Don't have an account?
            <Link to="/register" >Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
