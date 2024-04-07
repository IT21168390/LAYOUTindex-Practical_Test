const express = require('express');
const router = express.Router();
const { createDevice, getDevice, getAllDevices, getAllDevicesIDsSerialNumbers } = require('../controllers/DeviceController');

router.post('/add', createDevice);
router.get('/:id', getDevice);
router.get('/', getAllDevices);
router.get('/identities/all', getAllDevicesIDsSerialNumbers);
//router.put('/:id', );
//router.delete('/:id', );

module.exports = router;