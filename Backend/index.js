const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const PORT = process.env.SOCKET_PORT || 4040;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const Connect_Database = () => {
    mongoose.connect(MONGODB_URL).then(() => {
        console.log(`Successfully MongoDB Connected!`)
    }).catch((error) => {
        console.log(`${error}`)
    })
}

// Server with mongodb connection
app.listen(PORT, () => {
    console.log(`Server initiated and running on port: ${PORT}`);
    Connect_Database();
});

app.use("/user",require("./src/api/routes/User.route"))