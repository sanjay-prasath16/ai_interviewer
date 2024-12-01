const express = require('express');
const authcontroller = require('../controllers/authcontroller');

const router = express.Router();

router.get('/', authcontroller.test);
router.post('/store_interview', authcontroller.storeInterviewData);

module.exports = router;