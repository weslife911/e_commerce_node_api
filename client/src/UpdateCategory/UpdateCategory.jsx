import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateCategory() {

  const navigate = useNavigate();

  const { id } = useParams();

    const formik = useFormik({
      initialValues: {
        name: "",
        description: ""
      }, validationSchema: Yup.object({
        name: Yup.string().required("Category name is required"),
        description: Yup.string().required("Category Description is required"),
      }), onSubmit: async(values) => {

        const url = `http://localhost:3000/api/category/update/${id}`;
        const newCategory = await axios.put(url, values);

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
          <header>Update Category</header>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} placeholder="Enter Category Name"/>
            <p>
              {formik.errors.name}
            </p>
            <textarea type="text" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder="Enter Category Description"></textarea>
            <p>
              {formik.errors.description}
            </p>
            <Link to={`/shop/delete_category/${id}`}>Delete Category</Link>
            <input type="submit" className="button" value="Update Category"/>
          </form>
        </div>
      </div>
    </>
  )
}


export default UpdateCategory;
