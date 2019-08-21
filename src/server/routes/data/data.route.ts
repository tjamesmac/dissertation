import express from 'express';
import controller from './data.controller';

const router = express.Router();

router.post('/data', controller);

export default router;
