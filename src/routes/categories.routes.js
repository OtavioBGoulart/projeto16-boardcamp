import { Router } from "express";
import { getCategories } from "../controllers/categories.controller.js";
import { validateCategory } from "../middlewares/categoryValidate.middleware.js";

const router = Router();

//router.post("/categories", validateCategory, getCategories);
router.get("/categories", validateCategory, getCategories);

export default router;