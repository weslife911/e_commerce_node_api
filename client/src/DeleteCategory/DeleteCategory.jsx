import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

function DeleteCategory() {

    const { id } = useParams();

    const navigate = useNavigate();

    const deleteCategory = async() => {
        const url = `http://localhost:3000/api/delete/category/${id}`;
        const response = await axios.delete(url);
        console.log(response);
        navigate("/shop/categories");
    };

  return (
    <>
        {/* <span>
            Delete category with ID {id}
        </span> */}
        <input type="submit" value="Delete" onClick={deleteCategory} />
    </>
  )
}

export default DeleteCategory;
