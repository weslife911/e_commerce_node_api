import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header/Header';
import axios from 'axios';
// import "./index.css";
// import Footer from './components/Footer/Footer';

function Layout() {


  return (
    <>
      <Header />
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default Layout;

export const getGoogleUserData = async() => {
  const url = "http://localhost:3000/api/current_user";
  const response = await axios.get(url);
  return response;
};