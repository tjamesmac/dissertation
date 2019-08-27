import express from 'express';
import controller from './home.controller';

const router = express.Router();

router
  .route('/')
  .get(controller.getSSR)
  .post(controller.postHomeController);

export default router;
