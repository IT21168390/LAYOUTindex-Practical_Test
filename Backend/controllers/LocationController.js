const LocationModel = require("../models/LocationModel");

const addNewLocation = async (request, response) => {
    console.log(request);
    const location = LocationModel.create(request.body);
};

module.exports = {addNewLocation};