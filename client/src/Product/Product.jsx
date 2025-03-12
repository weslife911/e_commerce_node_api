import axios from 'axios';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

function Product() {

    const data = useLoaderData();

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            stock: "",
            category: "Electronics",
            imageUrl: "",
            description: ""
        }, validationSchema: Yup.object({
            name: Yup.string().required("Product Name is required"),
            price: Yup.number().required("Product price is required"),
            stock: Yup.number().required("Product stock is required"),
            category: Yup.string().required("Product category is required"),
            imageUrl: Yup.string().required("Product image URL is required"),
            description: Yup.string().required("Product Description is required"),
        }), onSubmit: async(values) => {
            const url = "http://localhost:3000/api/add_product";
            const response = await axios.post(url, values);

            console.log(response);
        }
    });

  return (
    <>
      <div className="container">
        <input type="checkbox" id="check"/>
        <div className="login form">
          <header>Add Product</header>
          <form onSubmit={formik.handleSubmit}>
            <input value={formik.values.name} onChange={formik.handleChange} type="text" name='name'  placeholder="Enter Product Name"/>
            <p>
              {formik.errors.name}
            </p>
            <input value={formik.values.price} onChange={formik.handleChange}  type="number" name='price'  placeholder="Enter Product Price"/>
            <p>
              {formik.errors.price}
            </p>
            <input value={formik.values.stock} onChange={formik.handleChange}  type="number" name='stock'  placeholder="Enter Stock Number"/>
            <p>
              {formik.errors.stock}
            </p>
            <select name="category" value={formik.values.category} onChange={formik.handleChange} >
            {
                data.data.map((category) => (
                    <option key={category._id}>
                        {category.name}
                    </option>
                ))
            }
            </select>
            <p>
                {formik.errors.category}
            </p>
            <input value={formik.values.imageUrl} onChange={formik.handleChange}  type="text" name='imageUrl'  placeholder="Enter Product Image URL"/>
            <p>
              {formik.errors.imageUrl}
            </p>
            <textarea value={formik.values.description} onChange={formik.handleChange}  type="text" name='description' placeholder="Enter Product Description"></textarea>
            <p>
              {formik.errors.description}
            </p>
            <Link to="/products/list">View Products</Link>
            <input type="submit" className="button" value="Add Product"/>
          </form>
        </div>
      </div>
    </>
  )
}

export const fetchCategories = async() => {
    const url = "http://localhost:3000/api/categories";
    const response = await axios.get(url);
    return response;
};

export default Product;
