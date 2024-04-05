const express = require('express');
const deviceRoute = express.Router();

const device = require('../models/Device');

deviceRoute.post('/device', async (request, response)=>{
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
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

deviceRoute.get('/:id')

module.exports = deviceRoute;