require("dotenv").config();

const mongoose = require("mongoose");

const connectToDB = async() => {

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    await mongoose.connect(process.env.MONGODB_URL, connectionParams)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((e) => console.log(e));
};

module.exports = connectToDB;