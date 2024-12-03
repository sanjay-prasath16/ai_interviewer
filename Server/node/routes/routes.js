import express from 'express';
import authcontroller from '../controllers/authcontroller.js';

const router = express.Router();

router.get('/', authcontroller.test);
router.post('/store_interview', authcontroller.storeInterviewData);
router.post('/speak', authcontroller.aitts);

export default router;