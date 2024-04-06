const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
});

const Device = mongoose.model('Devices', deviceSchema);
module.exports = Device;