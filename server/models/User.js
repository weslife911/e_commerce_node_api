const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: [String],
        enum: ["customer", "admin"],
        default: "customer"
    },
    password: { type: String, required: true }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

const validateRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().required().label("Email"),
        role: Joi.string().label("Role"),
        password: passwordComplexity().required().label("Password"),
    });

    return schema.validate(data);
};

const validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = {
    User,
    validateRegister,
    validateLogin
};