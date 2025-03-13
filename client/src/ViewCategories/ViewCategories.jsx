import React from 'react'
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom';

function ViewCategories() {

    const data = useLoaderData();

  return (
    <div>
        {
            data.data.map((category) => (
                
                <p key={category._id}>
                    <Link to={`/shop/update_category/${category._id}`}>
                        {category.name}
                    </Link>
                </p>
            ))
        }
    </div>
  )
}

export const getCategories = async() => {
    try {
        const url = "https://e-commerce-node-api-zxb7.onrender.com/api/categories"
    const response = axios.get(url);
    return response;
    } catch(e) {
        console.log("Error fetching categories", e)
    }
}

export default ViewCategories;
