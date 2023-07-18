import { create, getById, update, deleteRoom, getAll } from '@/controllers/rooms';
import { auth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', auth, getAll);
router.get('/:id', auth, getById);
router.post('/create', auth, create);
router.put('/update/:id', auth, update);
router.delete('/delete/:id', auth, deleteRoom);

export default router;
