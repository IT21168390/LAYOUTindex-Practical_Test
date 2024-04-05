const mongoose = require('mongoose');
const { Schema, model,  } = mongoose;

const locationSchema = new Schema({

})

export const LocationModel = model("Locations", locationSchema);
//module.exports = LocationModel;