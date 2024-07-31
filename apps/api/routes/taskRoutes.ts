import express, { Router } from "express";
import auth from "../middleware/authMiddleware";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController"

const router: Router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
