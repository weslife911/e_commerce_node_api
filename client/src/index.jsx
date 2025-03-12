import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Layout from "./Layout";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import NotFound from './components/NotFound/NotFound';
import Category from "./Category/Category";
import CategoryLayout from "./CategoryLayout";
import ViewCategories, { getCategories } from "./ViewCategories/ViewCategories";
import UpdateCategory from "./UpdateCategory/UpdateCategory";
import DeleteCategory from "./DeleteCategory/DeleteCategory";
import Product, { fetchCategories } from "./Product/Product";
import ProductLayout from "./ProductLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="register" element={<SignUp/>} />
            <Route path="login" element={<Login/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path="shop/" element={<CategoryLayout/>} >
                <Route path="add_category" element={<Category/>} />
                <Route path="categories" loader={getCategories} element={<ViewCategories/>} />
                <Route path="update_category/:id" element={<UpdateCategory/>} />
                <Route path="delete_category/:id" element={<DeleteCategory/>} />
            </Route>
            <Route path="products/" element={<ProductLayout/>}>
                <Route path="add_product" loader={fetchCategories} element={<Product/>} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);