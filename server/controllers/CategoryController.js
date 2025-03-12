const { validateCategory, Category } = require("../models/Category");

const addCategory = async(req, res) => {
    try {

        const { error } = validateCategory(req.body);
        const { name, description } = req.body;

        if(error) res.json({
            success: false,
            message: error.details[0].message
        });

        const newCategory = await new Category({
            name: name,
            description: description
        }).save();

        if(!newCategory) return res.json({
            success: false,
            message: "Category was not added successfully!!!"
        });

        res.status(201).json({
            success: true,
            message: "Category added successfully"
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};

const getCategory = async(req, res) => {
    try {

        const { id } = req.params;

        const category = await Category.find({ _id: id });

        if(!category) return res.json({
            success: false,
            message: "Categories could not be found"
        });
    
        res.status(200).json(category);

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};

const updateCategory = async(req, res) => {
    try {

        const { id } = req.params;

        const { name, description } = req.body;

        const checkCategory = await Category.findById({ _id: id });

        if(!checkCategory) return res.json({
            success: false,
            message: "Category with given ID does not exist"
        });

        const updateCategoryById = await Category.findByIdAndUpdate(id, {
            $set: { name: name, description: description },
        }, { new: true });

        if(!updateCategoryById) return res.json({
            success: false,
            message: "Category with given ID could not be updated"
        });

        res.status(204).json({
            success: true,
            message: "Category updated successfully"
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};

const deleteCategory = async(req, res) => {
    try {

        const { id } = req.params;

        const checkCategory = await Category.findById({ _id: id });

        if(!checkCategory) return res.json({
            success: false,
            message: "Category with given ID does not exist"
        });

        const deleteCategoryById = await Category.findByIdAndDelete(id);

        if(!deleteCategoryById) return res.json({
            success: false,
            message: "Category with given ID could not be updated"
        });

        res.status(205).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again."
        });
    }
};

const getAllCategories = async(req, res) => {
    const allCategories = await Category.find({});

    if(!allCategories.length > 0) return res.json({
        success: false,
        message: "Categories could not be found"
    });

    res.status(200).json(allCategories);
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};