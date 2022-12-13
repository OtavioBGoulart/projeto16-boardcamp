import { Router } from "express";
import {createRental, getRentals} from "../controllers/rentals.controller.js";
import { validadeRental } from "../middlewares/rentalValidate.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validadeRental, createRental);


export default router;