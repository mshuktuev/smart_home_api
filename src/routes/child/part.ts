import express from "express";
import { index, view, create } from '@/controllers/users';

const router = express.Router();

router.get('', index);
router.get('/:part_id', view);
router.post('/add', create);

export default router;



