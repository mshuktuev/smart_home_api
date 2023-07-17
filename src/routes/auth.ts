import express from 'express';
import { login, refresh } from '@/controllers/auth';

const router = express.Router();

router.post('', login);
router.post('/refreshToken', refresh);

export default router;
