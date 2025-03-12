const mongoose = require("mongoose");
const Joi = require("joi");


const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Category Name"),
        description: Joi.string().required().label("Category Description"),
    });

    return schema.validate(data);
};

module.exports = {
    Category,
    validateCategory
};