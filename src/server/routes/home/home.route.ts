import express from 'express';
import controller from './home.controller';

const router = express.Router();

router.post('/', controller.postHomeController);
router.get('/', controller.getSSR);

export default router;
