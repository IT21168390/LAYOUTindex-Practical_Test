const router = require('express').Router();
const { addNewLocation } = require('../controllers/LocationController');

router.post('/', addNewLocation);

module.exports = router;