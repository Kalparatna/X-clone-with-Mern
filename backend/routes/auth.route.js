import { signup, login, logout, getMe } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import express from 'express';
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/me', protectRoute, getMe);

export default router;