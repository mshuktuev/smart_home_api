import { create, getById, update, deleteRoom, getAll } from '@/controllers/rooms';
import { isAuth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', isAuth, getAll);
router.get('/:id', isAuth, getById);
router.post('/create', isAuth, create);
router.put('/update/:id', isAuth, update);
router.delete('/delete/:id', isAuth, deleteRoom);

export default router;
