import express from 'express';
import controller from './admin.controller';

const router = express.Router();

router
  .route('/admin/data')
  .get(controller.getAdmin);

export default router;
