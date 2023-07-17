import express from "express";
import part from './part';

const router = express.Router();

router.use('/part', part);

export default router;