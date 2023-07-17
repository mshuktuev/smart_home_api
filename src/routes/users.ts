import express from "express";
import { getAll, getById, create, update, remove } from "@/controllers/users";

const router = express.Router();

router.get("", getAll);
router.post("/create", create);
router.get("/:user_id", getById);
router.put("/:user_id", update);
router.delete("/:user_id", remove);

export default router;
