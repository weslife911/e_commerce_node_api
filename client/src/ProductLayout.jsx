import React from 'react'
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useJwt } from "react-jwt";

function ProductLayout() {

  const { decodedToken } = useJwt(localStorage.getItem("token"));




  if(decodedToken) {
    // console.log(decodedToken.role[0]);
  } else {
    
  }

  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default ProductLayout;
