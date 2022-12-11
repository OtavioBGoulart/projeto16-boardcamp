import { Router } from "express";
import {} from "../controllers/categories.controller.js";

const router = Router();

router.post("/categories");
router.get("/categories");

export default router;