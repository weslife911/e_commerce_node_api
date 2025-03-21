E-Commerce Project with Category and Product API
This project is a full-stack e-commerce application that includes a backend API for managing categories and products, and a React frontend to perform CRUD (Create, Read, Update, Delete) operations. The backend is built with Node.js and Express, while the frontend is built with React.

Features
Category Management: Create, read, update, and delete categories.

Product Management: Create, read, update, and delete products.

React Frontend: A user-friendly interface to interact with the backend API.

Technologies Used
Backend: Node.js, Express, MongoDB

Frontend: React, Axios

Database: MongoDB

Getting Started
Prerequisites
Node.js and npm installed on your machine.

MongoDB installed and running.

Installation
Clone the repository

bash
Copy
git clone https://github.com/weslife911/e_commerce_api.git
cd e_commerce_api
Install backend dependencies

bash
Copy
cd backend
npm install
Install frontend dependencies

bash
Copy
cd ../client
npm install
Set up environment variables

Create a .env file in the backend directory and add the following:

env
Copy
MONGODB_URL=mongodb://localhost:27017/ecommerce_db
PORT=3000
Start the backend server

bash
Copy
cd ../server
npm install
Start the frontend development server


cd ../client
npm start
Access the application

Open your browser and navigate to http://localhost:3000.

API Endpoints

Users

GET /api/users: Get all customers
GET /api/user/:id Get single user

Categories
GET /api/categories: Get all categories.

GET /api/category/:id: Get a single category by ID.

POST /api/add_category: Create a new category.

PUT /api/category/update/:id: Update a category by ID.

DELETE /api/category/:id: Delete a category by ID.

Products
GET /api/products: Get all products.

GET /api/product/:id: Get a single product by ID.

POST /api/add_product: Create a new product.

PUT /api/product/update/:id: Update a product by ID.

DELETE /api/product/:id: Delete a product by ID.

Frontend Implementation
The React frontend provides a user interface to interact with the backend API. It includes the following components:

CategoryList: Displays a list of categories and allows for creating, updating, and deleting categories.

ProductList: Displays a list of products and allows for creating, updating, and deleting products.

CategoryForm: A form for creating and updating categories.

ProductForm: A form for creating and updating products.



Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.
