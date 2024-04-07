const DeviceModel = require("../models/DeviceModel");

const acceptableTypes = ['pos', 'kisok', 'signage'];
const acceptableStatuses = ['active', 'inactive'];

const createDevice = async (request, response) => {
    console.log(request.body);
    console.log(request.file);
    const { serialNumber, type, status } = request.body;
    const image = request.file;
    try {
        if (!serialNumber || !type || !image) {
            return response.status(400).send({
                message: 'Please complete all required fields!',
            });
        } else if (!acceptableTypes.includes(type)) {
            return response.status(400).send({ message: 'Type must be pos, kisok, or signage!' });
        }
        if (status && !acceptableStatuses.includes(status)) {
            return response.status(400).send({ message: `Only ${acceptableStatuses} are valid Statuses!` });
        }

        const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        const maxImageSizeInBytes = 2 * 1024 * 1024; // 2MB

        if (!ALLOWED_IMAGE_TYPES.includes(image.mimetype)) {
            return response.status(400).send({ message: 'Invalid image file type!' });
        } else if (image.size > maxImageSizeInBytes) {
            return response.status(400).send({ message: 'Image size exceeds the preferred limit!' });
        }

        const base64ImageData = image.buffer.toString('base64');

        const newDevice = {
            serialNumber,
            type,
            image: base64ImageData,
            status
        };

        const device = await DeviceModel.create(newDevice);

        return response.status(201).send(device);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

const getDevice = async (request, response) => {
    console.log(request);
    const id = request.params.id;
    try {
        if (!id) {
            return response.status(400).send({
                message: 'Check the Id parameter!',
            });
        }
        const device = await DeviceModel.findById(id);
        if (!device) {
            response.status(404).json({ message: "Invalid ID! No data found." })
        }
        // Decode Base64 data
        const image = Buffer.from(device.image, 'base64');
        device.image = image;
        response.status(200).send(device);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

const getAllDevices = async (request, response) => {
    try {
        const devices = await DeviceModel.find();
        if (!devices) {
            response.status(404).json({ message: "Devices not found!" })
        }
        response.status(200).send(devices);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

const getAllDevicesIDsSerialNumbers = async (req, res) => {
    try {
        const devicesIDsAndSerialNumbers = await DeviceModel.find({}, { _id: 1, serialNumber: 1 });
        if (!devicesIDsAndSerialNumbers) {
            res.status(404).json({ message: "Devices not found!" })
        }
        res.status(200).json(devicesIDsAndSerialNumbers);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}


module.exports = { createDevice, getDevice, getAllDevices, getAllDevicesIDsSerialNumbers };