import {
	create,
	getById,
	getAllUnused,
	update,
	updateDeviceInfo,
	attachDevice,
	detachDevice,
	deleteDevice,
	getAll,
	updateDevicePosition,
} from '@/controllers/devices';
import { auth, authAdmin } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', auth, getAll);
router.get('/getUnused', auth, getAllUnused);
router.get('/:id', auth, getById);
router.post('/create', authAdmin, create);
router.put('/update/:id', authAdmin, update);
router.put('/attachDevice/:id', auth, attachDevice);
router.put('/detachDevice/:id', auth, detachDevice);
router.put('/updateInfo/:id', auth, updateDeviceInfo);
router.delete('/delete/:id', authAdmin, deleteDevice);
router.put('/updateDevicePosition/:id', authAdmin, updateDevicePosition);
export default router;
