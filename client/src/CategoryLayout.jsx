import axios from 'axios';
import React from 'react'
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import { Outlet, useLoaderData } from 'react-router-dom';

function CategoryLayout() {


  return (
    <>
        <Outlet/>
    </>
  )
}

export default CategoryLayout;
