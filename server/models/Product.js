const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Product Name"),
        price: Joi.number().required().label("Product Price"),
        stock: Joi.number().required().label("Stock Number"),
        category: Joi.string().required().label("Product Category"),
        imageUrl: Joi.string().required().label("Product Image URL"),
        description: Joi.string().required().label("Product Description"),
    });

    return schema.validate(data);
};

module.exports = {
    Product,
    validate
};