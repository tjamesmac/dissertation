import express from 'express';
import controller from './home.controller';

const router = express.Router();

router.post('/', controller);

export default router;
