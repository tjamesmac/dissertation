import express from 'express';
import controller from './choice.controller';

const router = express.Router();

router
  .route('/new')
  .get(controller.getNew)
  .post(controller.postName);
  // .post()

export default router;
