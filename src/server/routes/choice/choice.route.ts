import express from 'express';
import controller from './choice.controller';

const router = express.Router();

router
  .route('/choice/data')
  .get(controller.getNew)
  .post(controller.postName);

export default router;
