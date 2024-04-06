const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
//require('dotenv').config();
const app = express();

// Middleware
//app.use(express.json());  // a middleware, because Node does not give this by default
//app.use(express.urlencoded({extended: false})); // extend: true if large or complex data sent from HTML forms like nested objects, arrays
//app.use(cors);

const deviceRoute = require("./routes/DeviceRoutes");
const locationRoute = require("./routes/LocationRoutes");

// Routes
app.use('/api/devices', deviceRoute);
app.use('/api/locations', locationRoute);

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
