const mongoose = require("mongoose");

const userGoogleSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    role: {
        type: [String],
        enum: ["customer", "admin"],
        default: "customer"
    },
}, {timestamps: true});

const GoogleUser = mongoose.model("GoogleUser", userGoogleSchema);

module.exports = GoogleUser;