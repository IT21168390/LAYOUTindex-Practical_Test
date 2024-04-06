const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['pos', 'kisok', 'signage'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
});

const Device = mongoose.model('Devices', deviceSchema);
module.exports = Device;