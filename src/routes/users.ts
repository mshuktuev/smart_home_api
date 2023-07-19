import express from 'express';
import { getAll, getById, create, update, remove } from '@/controllers/users';
import { auth } from '@/middlewares';

const router = express.Router();

router.get('', auth, getAll);
router.post('/create', create);
router.get('/:user_id', auth, getById);
router.put('/:user_id', auth, update);
router.delete('/:user_id', auth, remove);

export default router;
