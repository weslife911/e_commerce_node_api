const mongoose = require("mongoose");

const userFacebookSchema = new mongoose.Schema({
    facebookId: String,
    name: String,
    // email: String,
    role: {
        type: [String],
        enum: ["customer", "admin"],
        default: "customer"
    },
}, {timestamps: true});

const FacebookUser = mongoose.model("FacebookUser", userFacebookSchema);

module.exports = FacebookUser;