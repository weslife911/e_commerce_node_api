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
    const url = "http://localhost:3000/api/categories"
    const response = axios.get(url);
    return response;
}

export default ViewCategories;
