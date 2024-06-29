import { getNotifications, deleteNotifications } from '../controllers/notification.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import express from 'express';
const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotifications);

export default router;