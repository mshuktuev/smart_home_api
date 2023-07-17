import { create, getById, update, deleteSpace, getAll } from '@/controllers/spaces';
import { isAuth } from '@/middlewares';
import express from 'express';

const router = express.Router();

router.get('', isAuth, getAll);
router.get('/:id', isAuth, getById);
router.post('/create', isAuth, create);
router.put('/update/:id', isAuth, update);
router.delete('/delete/:id', isAuth, deleteSpace);

export default router;
