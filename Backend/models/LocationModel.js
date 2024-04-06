const mongoose = require('mongoose');
const { Schema, model, } = mongoose;

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
    },
    devices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Devices'
        }
    ]
})

const LocationModel = model("Locations", locationSchema);
module.exports = LocationModel;