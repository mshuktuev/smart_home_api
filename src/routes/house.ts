import { create, getById, update, deleteHouse, getAll } from '@/controllers/house';
import { isAuth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', isAuth, getAll);
router.get('/:id', isAuth, getById);
router.post('/create', isAuth, create);
router.put('/update/:id', isAuth, update);
router.delete('/delete/:id', isAuth, deleteHouse);

export default router;
