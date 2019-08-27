import express from 'express';
import controller from './choice.controller';

const router = express.Router();

router.post('/new', controller.getNew);

export default router;
