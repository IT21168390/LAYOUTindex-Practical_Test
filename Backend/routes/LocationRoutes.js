const router = require('express').Router();
const { addNewLocation, getLocation, getAllLocations, updateLocationDevices } = require('../controllers/LocationController');

router.post('/add', addNewLocation);
router.get('/:id', getLocation);
router.get('/', getAllLocations);
router.put('/update/:id/devices', updateLocationDevices);
//router.delete('/:id', );

module.exports = router;