import express from 'express';
import controller from './data.controller';

const router = express.Router();

router
  .route('/data')
  .post(controller);

export default router;
