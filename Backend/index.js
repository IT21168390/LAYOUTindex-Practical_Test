const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const multer = require('multer'); // Import multer for handling form-data
const upload = multer(); // Configure an instance for handling single file uploads

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
