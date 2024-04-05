const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
//require('dotenv').config();
const app = express();

app.use(cors);

const deviceRoute = require("./routes/DeviceManagement");
const locationRoute = require("./routes/LocationsManagement");

app.use('/devices', deviceRoute);
app.use('/locations', locationRoute);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_DB_Connection)
    .then(() => {
        console.log("Mongoose connected.");
        app.listen(PORT, () => {
            console.log(`Server is Running on Port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
