import express from 'express';
import users from './users';
import auth from './auth';
import spaces from './spaces';
import house from './house';
import rooms from './rooms';

const router = express.Router();

router.use('/auth', auth);
router.use('/user', users);
router.use('/space', spaces);
router.use('/house', house);
router.use('/rooms', rooms);

export default router;
