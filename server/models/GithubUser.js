const mongoose = require("mongoose");

const userGithubSchema = new mongoose.Schema({
    githubId: String,
    name: String,
    email: String,
    role: {
        type: [String],
        enum: ["customer", "admin"],
        default: "customer"
    },
}, {timestamps: true});

const GithubUser = mongoose.model("GithubUser", userGithubSchema);

module.exports = GithubUser;