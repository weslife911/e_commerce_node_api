import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import axios from "axios";

function Category() {

    const navigate = useNavigate();

    

    const formik = useFormik({
      initialValues: {
        name: "",
        description: ""
      }, validationSchema: Yup.object({
        name: Yup.string().required("Category name is required"),
        description: Yup.string().required("Category Description is required"),
      }), onSubmit: async(values) => {

        const url = "http://localhost:3000/api/add_category"
        const newCategory = await axios.post(url, values);

        console.log(newCategory);

      }
    });

    if(!localStorage.getItem("token")) {
        navigate("/login");
    }

  return (
    <>
      <div className="container">
        <input type="checkbox" id="check"/>
        <div className="login form">
          <header>Add Category</header>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} placeholder="Enter Category Name"/>
            <p>
              {formik.errors.name}
            </p>
            <textarea type="text" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder="Enter Category Description"></textarea>
            <p>
              {formik.errors.description}
            </p>
            <Link to="/shop/categories">View Categories</Link>
            <input type="submit" className="button" value="Add Category"/>
          </form>
        </div>
      </div>
    </>
  )
}

export default Category;
