import { Router } from "express";
import { getCostumers, createCostumer,
     updateCostumer, getCostumerById } from "../controllers/costumers.controller.js";
import { validateCostumer } from "../middlewares/costumerValidate.middleware.js";

const router = Router();

router.get("/costumers", getCostumers);
router.get("costumers/:id", getCostumerById);
router.post("/costumers", validateCostumer, createCostumer);
router.put("./costumers", updateCostumer);
