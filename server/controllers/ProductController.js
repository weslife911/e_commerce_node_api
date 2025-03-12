const { validate, Product } = require("../models/Product");
const { Category } = require("../models/Category");

const addProducts = async(req, res) => {
    try {

        const { error } = validate(req.body);

        const { name, price, stock, category, imageUrl, description } = req.body;

        if(error) return res.json({
            success: false,
            message: error.details[0].message
        });

        const categoryId = await Category.find({ name: category });

        if(!categoryId) return res.json({
            success: false,
            message: "ID does not exist for this category name"
        });

        const newProduct = await Product({
            name: name,
            price: price,
            stock: stock,
            category: categoryId._id,
            imageUrl: imageUrl,
            description: description
        }).save();

        if(!newProduct) res.json({
            success: false,
            message: "Product was not added successfully"
        });

        res.status(201).json({
            success: true,
            message: "Product was added successfully"
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};

const getProducts = async(req, res) => {
    const allProducts = await Product.find({});

    if(!allProducts.length > 0) return res.json({
        success: false,
        message: "Products were not found"
    });

    res.status(200).json(allProducts);

};

const getProduct = async(req, res) => {

    const { id } = req.params;

    const product = await Product.find({ _id: id }).populate("Category");

    if(!product) return res.json({
        success: false,
        message: "Product with given ID was not found"
    });

    res.status(200).json(product);

};

module.exports = {
    addProducts,
    getProducts,
    getProduct
}