const express = require('express');
const router = express.Router();
//const DeviceModel = require('../models/DeviceModel');
const { createDevice, getDevice, getAllDevices } = require('../controllers/DeviceController');

router.post('/add', createDevice);
router.get('/:id', getDevice);
router.get('/', getAllDevices);
router.put('/:id', );
router.delete('/:id', );

module.exports = router;