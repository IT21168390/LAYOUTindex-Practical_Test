const DeviceModel = require("../models/DeviceModel");

const createDevice = async (request, response) => {
    console.log(request);
    try {
        if (!request.body.type || !request.body.image) {
            return response.status(400).send({
                message: 'Please complete all required fields!',
            });
        }
        const newDevice = {
            type: request.body.type,
            image: request.body.image
        };
        //const newDevice2 = request.body;
        const device = await DeviceModel.create(request.body);
            /* .then(result => response.json(result))
            .catch(error => response.json(error));*/
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

module.exports = { createDevice, getDevice, getAllDevices };