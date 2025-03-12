import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    if(!localStorage.getItem("token")) {
        navigate("/login");
    } 

  return (
    <div>
      Home
    </div>
  )
}

export default Home;
