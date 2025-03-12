import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header/Header';
// import "./index.css";
// import Footer from './components/Footer/Footer';

function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default Layout;
