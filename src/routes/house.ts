import { create, getById, getByIdWithRoomData, update, deleteHouse, getAll } from '@/controllers/house';
import { auth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', auth, getAll);
router.get('/:id', auth, getById);
router.get('/withRooms/:id', auth, getByIdWithRoomData);
router.post('/create', auth, create);
router.put('/update/:id', auth, update);
router.delete('/delete/:id', auth, deleteHouse);

export default router;
