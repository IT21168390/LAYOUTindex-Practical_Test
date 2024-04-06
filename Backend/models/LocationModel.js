const mongoose = require('mongoose');
const { Schema, model,  } = mongoose;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
})

const LocationModel = model("Locations", locationSchema);
module.exports = LocationModel;