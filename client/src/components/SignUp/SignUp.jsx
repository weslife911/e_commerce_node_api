import React from 'react';
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

function SignUp() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    }, validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().min(8, "Must Contain 8 Characters").required("Password is required").matches( /^(?=.*[a-z])/, " Must Contain One Lowercase Character" ).matches( /^(?=.*[A-Z])/, " Must Contain One Uppercase Character" ).matches( /^(?=.*[0-9])/, " Must Contain One Number Character" ).matches( /^(?=.*[!@#\$%\^&\*])/, " Must Contain One Special Case Character" ),
    }), onSubmit: async(values) => {

      try {
        const url = "http://localhost:3000/auth/register";      
      const registerUser = await axios.post(url, values);
      console.log("Signup successful", registerUser.data);

      if(registerUser.data.success) {
        navigate("/login");
      } else {
        navigate("/register");
      }
      } catch(e) {
        console.log("Signup error", e);
      }

    }
  });

  return (
    <>
      <div className="container">
        <input type="checkbox" id="check"/>
        <div className="login form">
          <header>SignUp</header>
          <form onSubmit={formik.handleSubmit}>
            <input type="name" value={formik.values.name} onChange={formik.handleChange} name='name' placeholder="Enter your name"/>
            <p>
              {formik.errors.name}
            </p>
            <input type="email" value={formik.values.email} onChange={formik.handleChange} name='email' placeholder="Enter your email"/>
            <p>
              {formik.errors.email}
            </p>
            <input type="password" value={formik.values.password} onChange={formik.handleChange} name='password' placeholder="Enter your password"/>
            <p>
              {formik.errors.password}
            </p>
            <input type="submit" className="button" value="SignUp"/>
          </form>
          <div className="signup">
            <span className="signup">Already have an account?
            <Link to="/login" >Login</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
