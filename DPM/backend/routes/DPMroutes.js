const express = require('express');
const {LogPrediction, getAllData} = require('../controllers/DPMcontrollers');
const router = express.Router();

router.post('/predictAndLog', LogPrediction);
router.get('/getall', getAllData);
module.exports = router;