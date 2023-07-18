import { create, getById, update, deleteSpace, getAll } from '@/controllers/spaces';
import { auth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', auth, getAll);
router.get('/:id', auth, getById);
router.post('/create', auth, create);
router.put('/update/:id', auth, update);
router.delete('/delete/:id', auth, deleteSpace);

export default router;
