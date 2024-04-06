const LocationModel = require("../models/LocationModel");

const addNewLocation = async (request, response) => {
    try {
        console.log(request);
        if (!request.body.name) {
            response.status(400).json({ message: "Include the 'name' property properly!" });
        }
        const newLocation = await LocationModel.create(request.body);
        /*const location = new LocationModel(request.body);
        const newLocation2 = await location.save();*/
        response.status(201).send(newLocation);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
};

const updateLocationDevices = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await LocationModel.findByIdAndUpdate(id, { $set: { devices: req.body.devices } });
        const updatedLocation = await LocationModel.findById(id);
        if (!location || !updatedLocation) {
            res.status(400).json({ message: "Location not updated/found! [Probably invalid Location Id or Device(s)]" })
        }
        res.status(201).send(updatedLocation);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

const getLocation = async (request, response) => {
    try {
        const locationId = request.params.id;
        if (!locationId) {
            response.status(400).json({ message: "Location Id is required!" });
        }
        const location = await LocationModel.findById(locationId).populate('devices');
        if (!location) {
            response.status(404).json({ message: "Location not found!" });
        }
        response.status(200).send(location);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
}

const getAllLocations = async (request, response) => {
    try {
        const locations = await LocationModel.find();
        if (!locations)
            response.status(404).json({ message: "Locations not found!" });
        response.status(200).send(locations);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
}

module.exports = { addNewLocation, updateLocationDevices, getLocation, getAllLocations };