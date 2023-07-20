import { create, getById, getByIdWithRoomData, update, deleteHouse, getAll, getByIdWithDeviceData } from '@/controllers/house';
import { auth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', auth, getAll);
router.get('/:id', auth, getById);
router.get('/withRooms/:id', auth, getByIdWithRoomData);
router.get('/withDevices/:id', auth, getByIdWithDeviceData);
router.post('/create', auth, create);
router.put('/update/:id', auth, update);
router.delete('/delete/:id', auth, deleteHouse);

export default router;
