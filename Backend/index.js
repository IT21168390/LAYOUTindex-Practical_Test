const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
require('dotenv').config();

const multer = require('multer'); // Import multer for handling form-data
const upload = multer(); // Configure an instance for handling single file uploads

const app = express();

// Middleware

//app.use(bodyParser.json());
//app.use(multer().any());

app.use(express.json());  // a middleware, because Node does not give this by default
//app.use(express.raw({limit: '2mb'}));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); // extend: true if large or complex data sent from HTML forms like nested objects, arrays
//app.use(cors);

app.use(upload.single('image'));

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
