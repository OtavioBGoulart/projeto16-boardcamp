import { Router } from "express";
import { getCategories, createCategory  } from "../controllers/categories.controller.js";
import { validateCategory } from "../middlewares/categoryValidate.middleware.js";

const router = Router();

//router.post("/categories", validateCategory, getCategories);
router.get("/categories", getCategories);
router.post("/categories", validateCategory, createCategory);

export default router;