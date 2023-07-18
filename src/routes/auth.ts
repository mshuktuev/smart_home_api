import express from 'express';
import { login, refresh, isAuth, logout } from '@/controllers/auth';

const router = express.Router();

router.post('', login);
router.post('/refreshToken', refresh);
router.get('/isAuth', isAuth);
router.post('/logout', logout);

export default router;
