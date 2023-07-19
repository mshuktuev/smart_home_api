import express from 'express';
import users from './users';
import auth from './auth';
import house from './house';
import rooms from './rooms';
import devices from './device';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', users);
router.use('/house', house);
router.use('/rooms', rooms);
router.use('/device', devices);

export default router;
